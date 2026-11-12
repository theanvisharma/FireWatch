import uuid
import logging
from datetime import datetime
from typing import Optional
import httpx
from sqlalchemy.orm import Session
from backend.app.core.config import settings
from backend.app.models.location import LocationModel
from backend.app.models.weather import WeatherObservationModel
from backend.app.schemas.weather import WeatherData, HourlyForecast
from backend.app.services.mock_engine import get_mock_weather, SECTORS

logger = logging.getLogger(__name__)


def _deg_to_compass(deg: float) -> str:
    dirs = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
    return dirs[int((deg + 11.25) / 22.5) % 16]


class WeatherService:
    @staticmethod
    def get_current_weather(location_id: str, db: Optional[Session] = None) -> WeatherData:
        if settings.MOCK_MODE_ENABLED or db is None:
            return get_mock_weather(location_id)

        loc = db.query(LocationModel).filter(LocationModel.id.ilike(location_id)).first()
        if not loc:
            fallback = next((s for s in SECTORS if s["id"].lower() == location_id.lower()), None)
            if not fallback:
                return get_mock_weather(location_id)
            lat, lon, loc_name, loc_id = fallback["lat"], fallback["lon"], fallback["name"], fallback["id"]
        else:
            lat, lon, loc_name, loc_id = loc.latitude, loc.longitude, loc.name, loc.id

        try:
            url = (
                f"https://api.open-meteo.com/v1/forecast"
                f"?latitude={lat}&longitude={lon}"
                f"&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,"
                f"wind_speed_10m,wind_direction_10m,shortwave_radiation,vapour_pressure_deficit,soil_moisture_0_to_7cm"
                f"&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation_probability"
                f"&forecast_days=1"
            )
            resp = httpx.get(url, timeout=8.0)
            resp.raise_for_status()
            data = resp.json()
            cur = data["current"]
            hourly = data.get("hourly", {})

            temp = float(cur.get("temperature_2m", 32.0))
            humidity = float(cur.get("relative_humidity_2m", 40.0))
            wind_speed = float(cur.get("wind_speed_10m", 15.0))
            wind_dir = _deg_to_compass(float(cur.get("wind_direction_10m", 45.0)))
            rain_24h = float(cur.get("precipitation", 0.0))
            # Convert volumetric m³/m³ (0.0-0.5) to percentage (0-100%)
            raw_sm = cur.get("soil_moisture_0_to_7cm")
            soil_moisture = round(float(raw_sm) * 100, 1) if raw_sm is not None else 22.0
            solar_rad = float(cur.get("shortwave_radiation", 750.0))
            vpd = round(float(cur.get("vapour_pressure_deficit", 1.8)), 2)
            now = datetime.utcnow()

            # Save live observation to PostgreSQL
            if loc:
                obs = WeatherObservationModel(
                    id=str(uuid.uuid4()),
                    location_id=loc_id,
                    temperature=temp,
                    humidity=humidity,
                    wind_speed=wind_speed,
                    wind_direction=wind_dir,
                    rainfall_past_24h=rain_24h,
                    soil_moisture=soil_moisture,
                    solar_radiation=solar_rad,
                    vpd_kpa=vpd,
                    recorded_at=now,
                )
                db.add(obs)
                db.commit()

            forecast_list = []
            times = hourly.get("time", [])[:24:4]
            temps = hourly.get("temperature_2m", [])[:24:4]
            hums = hourly.get("relative_humidity_2m", [])[:24:4]
            winds = hourly.get("wind_speed_10m", [])[:24:4]
            probs = hourly.get("precipitation_probability", [])[:24:4]
            for i, t_str in enumerate(times):
                forecast_list.append(
                    HourlyForecast(
                        time=t_str.split("T")[-1],
                        temperature=float(temps[i]) if i < len(temps) else temp,
                        humidity=float(hums[i]) if i < len(hums) else humidity,
                        wind_speed=float(winds[i]) if i < len(winds) else wind_speed,
                        precipitation_prob=round((float(probs[i]) if i < len(probs) else 10.0) / 100.0, 2),
                    )
                )

            return WeatherData(
                location_id=loc_id,
                location_name=loc_name,
                latitude=lat,
                longitude=lon,
                temperature=temp,
                feels_like=float(cur.get("apparent_temperature", temp)),
                humidity=humidity,
                wind_speed=wind_speed,
                wind_direction=wind_dir,
                rainfall_past_24h=rain_24h,
                soil_moisture=soil_moisture,
                solar_radiation=solar_rad,
                vpd_kpa=vpd,
                drought_index=round(max(100.0, (45 - soil_moisture) * 14.0), 1),
                condition="Hot & Arid" if temp > 35 else "Clear / Partly Cloudy",
                icon="sun",
                forecast=forecast_list,
                recorded_at=now,
            )
        except Exception as e:
            logger.warning(f"Live weather API failed for {location_id}, falling back to DB/mock: {e}")
            latest = (
                db.query(WeatherObservationModel)
                .filter(WeatherObservationModel.location_id == loc_id)
                .order_by(WeatherObservationModel.recorded_at.desc())
                .first()
            )
            if latest and loc:
                return WeatherData(
                    location_id=loc.id,
                    location_name=loc.name,
                    latitude=loc.latitude,
                    longitude=loc.longitude,
                    temperature=latest.temperature,
                    feels_like=latest.temperature + 1.5,
                    humidity=latest.humidity,
                    wind_speed=latest.wind_speed,
                    wind_direction=latest.wind_direction or "ENE",
                    rainfall_past_24h=latest.rainfall_past_24h,
                    soil_moisture=latest.soil_moisture,
                    solar_radiation=latest.solar_radiation or 800.0,
                    vpd_kpa=latest.vpd_kpa or 2.0,
                    drought_index=450.0,
                    condition="Stored Observation",
                    icon="sun",
                    forecast=[],
                    recorded_at=latest.recorded_at,
                )
            return get_mock_weather(location_id)