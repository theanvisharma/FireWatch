import uuid
import logging
from datetime import datetime, date
from geoalchemy2.elements import WKTElement
from backend.app.core.database import SessionLocal
from backend.app.models.location import LocationModel
from backend.app.models.prediction import PredictionModel
from backend.app.models.alert import AlertModel
from backend.app.models.weather import WeatherObservationModel
from backend.app.models.historical import HistoricalWildfireModel
from backend.app.services.mock_engine import SECTORS, score_to_level, get_mock_alerts, get_mock_historical_events

logger = logging.getLogger(__name__)


def seed_database() -> None:
    """Seeds PostgreSQL + PostGIS with initial monitored sectors, predictions, alerts, and historical events."""
    if SessionLocal is None:
        return

    db = SessionLocal()
    try:
        # Only seed if monitored_locations is empty
        if db.query(LocationModel).count() > 0:
            return

        logger.info("Seeding PostgreSQL + PostGIS with initial FireWatch AI data...")

        for s in SECTORS:
            lat, lon = s["lat"], s["lon"]
            delta = 0.04
            point_wkt = f"POINT({lon} {lat})"
            poly_wkt = (
                f"POLYGON(({lon - delta} {lat - delta}, "
                f"{lon + delta} {lat - delta}, "
                f"{lon + delta} {lat + delta}, "
                f"{lon - delta} {lat + delta}, "
                f"{lon - delta} {lat - delta}))"
            )

            loc = LocationModel(
                id=s["id"],
                name=s["name"],
                region=s["region"],
                country="India",
                latitude=lat,
                longitude=lon,
                geom=WKTElement(point_wkt, srid=4326),
                boundary_geom=WKTElement(poly_wkt, srid=4326),
                elevation_meters=650.0,
                vegetation_type="Dry Deciduous / Scrub",
            )
            db.add(loc)

            pred = PredictionModel(
                id=str(uuid.uuid4()),
                location_id=s["id"],
                risk_score=s["base_risk"],
                risk_level=score_to_level(s["base_risk"]).value,
                prediction_horizon="24-72 hours",
                factors={
                    "temperature": s["temp"],
                    "wind_speed": s["wind"],
                    "rainfall": s["rain"],
                    "soil_moisture": s["moisture"],
                    "relative_humidity": s["humidity"],
                    "ndvi": s["ndvi"],
                    "slope": s["slope"],
                },
                model_version="v1.0-xgb-seeded",
                confidence=0.91,
                generated_at=datetime.utcnow(),
            )
            db.add(pred)

            obs = WeatherObservationModel(
                id=str(uuid.uuid4()),
                location_id=s["id"],
                temperature=s["temp"],
                humidity=s["humidity"],
                wind_speed=s["wind"],
                wind_direction="ENE",
                rainfall_past_24h=s["rain"],
                soil_moisture=s["moisture"],
                solar_radiation=850.0,
                vpd_kpa=2.35,
                recorded_at=datetime.utcnow(),
            )
            db.add(obs)
        db.flush()
        for a in get_mock_alerts():
            db.add(
                AlertModel(
                    id=a.id,
                    location_id=a.location_id,
                    severity=a.severity.value,
                    risk_score=a.risk_score,
                    message=a.message,
                    preventive_action=a.preventive_action,
                    is_read=a.is_read,
                    status=a.status,
                    created_at=a.timestamp,
                )
            )

        for h in get_mock_historical_events():
            db.add(
                HistoricalWildfireModel(
                    id=h.id,
                    incident_date=date.fromisoformat(h.incident_date),
                    location_id=h.location_id,
                    location_name=h.location_name,
                    region=h.region,
                    latitude=h.latitude,
                    longitude=h.longitude,
                    max_risk_score=h.max_risk_score,
                    severity=h.severity.value,
                    area_burned_hectares=h.area_burned_hectares,
                    containment_days=h.containment_days,
                    cause=h.cause,
                    temperature_at_ignition=h.temperature_at_ignition,
                    wind_speed_at_ignition=h.wind_speed_at_ignition,
                    humidity_at_ignition=h.humidity_at_ignition,
                    soil_moisture_at_ignition=h.soil_moisture_at_ignition,
                    satellite_detection_sensor=h.satellite_detection_sensor,
                )
            )

        db.commit()
        logger.info("Initial seed data committed successfully.")
    except Exception as e:
        db.rollback()
        logger.error(f"Error seeding database: {e}")
    finally:
        db.close()