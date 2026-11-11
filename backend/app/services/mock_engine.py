from datetime import datetime, timedelta
import random
from typing import List, Dict, Any
from backend.app.schemas.risk import RiskLevel, EnvironmentalFactors, RiskAssessment, RiskMapFeature, RiskMapResponse
from backend.app.schemas.alert import AlertItem
from backend.app.schemas.weather import WeatherData, HourlyForecast
from backend.app.schemas.historical import HistoricalEvent
from backend.app.schemas.dashboard import DashboardSummary, RiskDistributionCount, EnvironmentalSummary

# Monitored Sector Registry (Focus on High Biodiversity & Fire-Prone zones)
SECTORS = [
    {
        "id": "LOC001",
        "name": "Khandala-Lonavala Ridge (Western Ghats)",
        "region": "Western Ghats, Maharashtra",
        "lat": 18.7557,
        "lon": 73.4091,
        "base_risk": 84.5,
        "temp": 37.8,
        "wind": 28.4,
        "rain": 0.0,
        "moisture": 14.2,
        "humidity": 26.0,
        "ndvi": 0.28,
        "slope": 24.5
    },
    {
        "id": "LOC002",
        "name": "Bhimashankar Wildlife Corridor",
        "region": "Western Ghats, Maharashtra",
        "lat": 19.0728,
        "lon": 73.5358,
        "base_risk": 72.0,
        "temp": 34.2,
        "wind": 21.0,
        "rain": 1.2,
        "moisture": 19.5,
        "humidity": 34.0,
        "ndvi": 0.42,
        "slope": 18.0
    },
    {
        "id": "LOC003",
        "name": "Mahabaleshwar Plateau Edge",
        "region": "Western Ghats, Maharashtra",
        "lat": 17.9237,
        "lon": 73.6586,
        "base_risk": 48.0,
        "temp": 29.5,
        "wind": 15.2,
        "rain": 4.5,
        "moisture": 32.0,
        "humidity": 52.0,
        "ndvi": 0.58,
        "slope": 14.0
    },
    {
        "id": "LOC004",
        "name": "Satpura Dry Deciduous Reserve",
        "region": "Central Highlands, MP",
        "lat": 22.4633,
        "lon": 78.4344,
        "base_risk": 91.2,
        "temp": 41.5,
        "wind": 32.0,
        "rain": 0.0,
        "moisture": 9.8,
        "humidity": 18.0,
        "ndvi": 0.21,
        "slope": 16.5
    },
    {
        "id": "LOC005",
        "name": "Bandipur Tiger Reserve Buffer",
        "region": "Nilgiri Biosphere, Karnataka",
        "lat": 11.6664,
        "lon": 76.6291,
        "base_risk": 63.8,
        "temp": 33.0,
        "wind": 19.5,
        "rain": 2.0,
        "moisture": 24.0,
        "humidity": 41.0,
        "ndvi": 0.47,
        "slope": 11.0
    },
    {
        "id": "LOC006",
        "name": "Similipal Sal Forest Zone",
        "region": "Mayurbhanj, Odisha",
        "lat": 21.8600,
        "lon": 86.3400,
        "base_risk": 79.4,
        "temp": 38.6,
        "wind": 25.0,
        "rain": 0.0,
        "moisture": 16.0,
        "humidity": 28.0,
        "ndvi": 0.35,
        "slope": 19.0
    },
    {
        "id": "LOC007",
        "name": "Wayanad Foothills Transition",
        "region": "Western Ghats, Kerala",
        "lat": 11.6854,
        "lon": 76.1320,
        "base_risk": 32.5,
        "temp": 27.8,
        "wind": 12.0,
        "rain": 14.0,
        "moisture": 48.0,
        "humidity": 68.0,
        "ndvi": 0.72,
        "slope": 15.0
    },
    {
        "id": "LOC008",
        "name": "Sariska Scrub & Ravine Zone",
        "region": "Aravalli Range, Rajasthan",
        "lat": 27.3200,
        "lon": 76.4300,
        "base_risk": 88.0,
        "temp": 42.0,
        "wind": 30.0,
        "rain": 0.0,
        "moisture": 8.0,
        "humidity": 15.0,
        "ndvi": 0.18,
        "slope": 10.0
    }
]


def score_to_level(score: float) -> RiskLevel:
    if score < 35:
        return RiskLevel.LOW
    elif score < 55:
        return RiskLevel.MODERATE
    elif score < 75:
        return RiskLevel.HIGH
    elif score < 88:
        return RiskLevel.VERY_HIGH
    else:
        return RiskLevel.EXTREME


def get_mock_dashboard_summary() -> DashboardSummary:
    now = datetime.utcnow()
    
    # Calculate counts
    scores = [s["base_risk"] for s in SECTORS]
    avg_risk = round(sum(scores) / len(scores), 1)
    high_risk_count = sum(1 for s in scores if s >= 70)
    
    distribution_map = {
        RiskLevel.LOW: {"count": 0, "color": "#43A879"},
        RiskLevel.MODERATE: {"count": 0, "color": "#D5B34A"},
        RiskLevel.HIGH: {"count": 0, "color": "#DB873A"},
        RiskLevel.VERY_HIGH: {"count": 0, "color": "#D95343"},
        RiskLevel.EXTREME: {"count": 0, "color": "#8F2528"},
    }
    
    for s in SECTORS:
        lvl = score_to_level(s["base_risk"])
        distribution_map[lvl]["count"] += 1
        
    dist_list = []
    total = len(SECTORS)
    for lvl, data in distribution_map.items():
        pct = round((data["count"] / total) * 100, 1)
        dist_list.append(RiskDistributionCount(
            category=lvl,
            count=data["count"],
            percentage=pct,
            color=data["color"]
        ))
        
    recent_preds = []
    for s in SECTORS[:4]:
        recent_preds.append(RiskAssessment(
            location_id=s["id"],
            location_name=s["name"],
            latitude=s["lat"],
            longitude=s["lon"],
            risk_score=s["base_risk"],
            risk_level=score_to_level(s["base_risk"]),
            prediction_horizon="24-72 hours",
            factors=EnvironmentalFactors(
                temperature=s["temp"],
                wind_speed=s["wind"],
                rainfall=s["rain"],
                soil_moisture=s["moisture"],
                relative_humidity=s["humidity"],
                ndvi=s["ndvi"],
                slope=s["slope"]
            ),
            model_version="v1.0-xgb-demo",
            generated_at=now - timedelta(minutes=random.randint(5, 45)),
            confidence=0.91,
            summary=f"Elevated ignition risk driven by high surface temp ({s['temp']}°C) and dry fuel load."
        ))
        
    recent_alerts = get_mock_alerts()[:3]
    
    return DashboardSummary(
        system_status="OPERATIONAL (PROTOTYPE DEMO)",
        last_updated=now,
        total_monitored_regions=len(SECTORS),
        high_risk_locations=high_risk_count,
        active_alerts=len(recent_alerts),
        avg_wildfire_risk=avg_risk,
        risk_distribution=dist_list,
        environmental_summary=EnvironmentalSummary(
            avg_temperature=35.5,
            avg_humidity=34.8,
            avg_wind_speed=23.5,
            avg_soil_moisture=21.8,
            drought_stress_status="Moderate to Severe Deficit",
            drought_index_val=462.0
        ),
        recent_predictions=recent_preds,
        recent_alerts=recent_alerts,
        data_disclaimer="DEMO DATA: FireWatch AI prediction engine is running in prototype simulation mode."
    )


def get_mock_risk_map() -> RiskMapResponse:
    now = datetime.utcnow()
    features = []
    high_count = 0
    
    for s in SECTORS:
        lvl = score_to_level(s["base_risk"])
        if s["base_risk"] >= 70:
            high_count += 1
            
        # Generate bounding polygon (small box around center)
        delta = 0.04
        polygon = [
            [s["lat"] - delta, s["lon"] - delta],
            [s["lat"] + delta, s["lon"] - delta],
            [s["lat"] + delta, s["lon"] + delta],
            [s["lat"] - delta, s["lon"] + delta],
            [s["lat"] - delta, s["lon"] - delta],
        ]
        
        features.append(RiskMapFeature(
            id=s["id"],
            name=s["name"],
            latitude=s["lat"],
            longitude=s["lon"],
            risk_score=s["base_risk"],
            risk_level=lvl,
            polygon=polygon,
            factors=EnvironmentalFactors(
                temperature=s["temp"],
                wind_speed=s["wind"],
                rainfall=s["rain"],
                soil_moisture=s["moisture"],
                relative_humidity=s["humidity"],
                ndvi=s["ndvi"],
                slope=s["slope"]
            ),
            active_incidents=1 if s["base_risk"] > 85 else 0,
            updated_at=now - timedelta(minutes=random.randint(2, 60))
        ))
        
    return RiskMapResponse(
        total_zones=len(features),
        high_risk_zones=high_count,
        timestamp=now,
        data_source_mode="SIMULATED_DEMO_DATA",
        features=features
    )


def get_mock_location_risk(location_id: str) -> RiskAssessment:
    now = datetime.utcnow()
    sector = next((s for s in SECTORS if s["id"].lower() == location_id.lower()), SECTORS[0])
    
    return RiskAssessment(
        location_id=sector["id"],
        location_name=sector["name"],
        latitude=sector["lat"],
        longitude=sector["lon"],
        risk_score=sector["base_risk"],
        risk_level=score_to_level(sector["base_risk"]),
        prediction_horizon="24-72 hours",
        factors=EnvironmentalFactors(
            temperature=sector["temp"],
            wind_speed=sector["wind"],
            rainfall=sector["rain"],
            soil_moisture=sector["moisture"],
            relative_humidity=sector["humidity"],
            ndvi=sector["ndvi"],
            slope=sector["slope"]
        ),
        model_version="v1.0-xgb-demo",
        generated_at=now,
        confidence=0.93,
        summary=f"Analysis for {sector['name']}: Low precipitation index and high thermal gradient suggest active monitoring required."
    )


def get_mock_alerts() -> List[AlertItem]:
    now = datetime.utcnow()
    return [
        AlertItem(
            id="ALT-1092",
            location_id="LOC004",
            location_name="Satpura Dry Deciduous Reserve",
            latitude=22.4633,
            longitude=78.4344,
            severity=RiskLevel.EXTREME,
            risk_score=91.2,
            timestamp=now - timedelta(minutes=18),
            message="Extreme fuel flammability threshold exceeded. Volumetric soil moisture fallen below 10%.",
            preventive_action="Mobilize rapid forest ranger patrol. Restrict tourist vehicle entry into Sector 4 fire-corridor.",
            is_read=False,
            status="active",
            affected_radius_km=25.0
        ),
        AlertItem(
            id="ALT-1088",
            location_id="LOC008",
            location_name="Sariska Scrub & Ravine Zone",
            latitude=27.3200,
            longitude=76.4300,
            severity=RiskLevel.EXTREME,
            risk_score=88.0,
            timestamp=now - timedelta(minutes=42),
            message="Dry winds exceeding 30 km/h with 42°C surface temperature creating severe fire hazard.",
            preventive_action="Pre-position local water bowsers at high-wind ridge crossings. Monitor thermal satellite feeds.",
            is_read=False,
            status="active",
            affected_radius_km=18.0
        ),
        AlertItem(
            id="ALT-1081",
            location_id="LOC001",
            location_name="Khandala-Lonavala Ridge (Western Ghats)",
            latitude=18.7557,
            longitude=73.4091,
            severity=RiskLevel.VERY_HIGH,
            risk_score=84.5,
            timestamp=now - timedelta(hours=2, minutes=10),
            message="Steep terrain slope combined with dry scrub vegetation produces critical chimney ignition conditions.",
            preventive_action="Issue precautionary smoke alert to expressway authority. Inspect firebreaks along railway slopes.",
            is_read=False,
            status="active",
            affected_radius_km=15.0
        ),
        AlertItem(
            id="ALT-1075",
            location_id="LOC006",
            location_name="Similipal Sal Forest Zone",
            latitude=21.8600,
            longitude=86.3400,
            severity=RiskLevel.HIGH,
            risk_score=79.4,
            timestamp=now - timedelta(hours=5),
            message="Consistent zero rainfall over 14 days and leaf litter accumulation detected.",
            preventive_action="Engage local Van Suraksha Samiti volunteers for controlled dampening of perimeter boundaries.",
            is_read=True,
            status="active",
            affected_radius_km=20.0
        ),
        AlertItem(
            id="ALT-1064",
            location_id="LOC002",
            location_name="Bhimashankar Wildlife Corridor",
            latitude=19.0728,
            longitude=73.5358,
            severity=RiskLevel.HIGH,
            risk_score=72.0,
            timestamp=now - timedelta(hours=8),
            message="Humidity dropped below 35% with moderate afternoon gusts along southern ridgeline.",
            preventive_action="Deploy drone survey over dense tree canopy to detect early thermal hotspots.",
            is_read=True,
            status="acknowledged",
            affected_radius_km=12.0
        )
    ]


def get_mock_weather(location_id: str) -> WeatherData:
    now = datetime.utcnow()
    sector = next((s for s in SECTORS if s["id"].lower() == location_id.lower()), SECTORS[0])
    
    hours = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"]
    forecast = []
    base_t = sector["temp"]
    for i, h in enumerate(hours):
        t_var = -5 if i in [0, 1] else (3 if i in [3, 4] else 0)
        forecast.append(HourlyForecast(
            time=h,
            temperature=round(base_t + t_var, 1),
            humidity=round(max(10, sector["humidity"] - t_var * 2), 1),
            wind_speed=round(sector["wind"] + random.uniform(-3, 4), 1),
            precipitation_prob=0.05 if sector["rain"] == 0 else 0.40
        ))
        
    return WeatherData(
        location_id=sector["id"],
        location_name=sector["name"],
        latitude=sector["lat"],
        longitude=sector["lon"],
        temperature=sector["temp"],
        feels_like=round(sector["temp"] + 2.5, 1),
        humidity=sector["humidity"],
        wind_speed=sector["wind"],
        wind_direction="ENE",
        rainfall_past_24h=sector["rain"],
        soil_moisture=sector["moisture"],
        solar_radiation=880.0,
        vpd_kpa=2.45,
        drought_index=512.0,
        condition="Hot & Arid" if sector["temp"] > 35 else "Partly Cloudy",
        icon="sun",
        forecast=forecast,
        recorded_at=now
    )


def get_mock_historical_events() -> List[HistoricalEvent]:
    return [
        HistoricalEvent(
            id="HIST-2025-001",
            incident_date="2025-04-12",
            location_id="LOC004",
            location_name="Satpura Dry Deciduous Reserve",
            region="Central Highlands, MP",
            latitude=22.4633,
            longitude=78.4344,
            max_risk_score=94.2,
            severity=RiskLevel.EXTREME,
            area_burned_hectares=420.5,
            containment_days=3,
            cause="Dry Fuel Spark",
            temperature_at_ignition=43.2,
            wind_speed_at_ignition=34.0,
            humidity_at_ignition=14.0,
            soil_moisture_at_ignition=7.5,
            satellite_detection_sensor="VIIRS"
        ),
        HistoricalEvent(
            id="HIST-2025-002",
            incident_date="2025-03-29",
            location_id="LOC006",
            location_name="Similipal Core Biosphere",
            region="Mayurbhanj, Odisha",
            latitude=21.8600,
            longitude=86.3400,
            max_risk_score=86.0,
            severity=RiskLevel.VERY_HIGH,
            area_burned_hectares=185.0,
            containment_days=2,
            cause="Under Investigation",
            temperature_at_ignition=39.8,
            wind_speed_at_ignition=26.5,
            humidity_at_ignition=22.0,
            soil_moisture_at_ignition=13.0,
            satellite_detection_sensor="MODIS"
        ),
        HistoricalEvent(
            id="HIST-2025-003",
            incident_date="2025-02-18",
            location_id="LOC001",
            location_name="Khandala Valley Ghat",
            region="Western Ghats, Maharashtra",
            latitude=18.7557,
            longitude=73.4091,
            max_risk_score=81.5,
            severity=RiskLevel.VERY_HIGH,
            area_burned_hectares=64.0,
            containment_days=1,
            cause="Human Activity (Debris)",
            temperature_at_ignition=36.0,
            wind_speed_at_ignition=24.0,
            humidity_at_ignition=29.0,
            soil_moisture_at_ignition=17.0,
            satellite_detection_sensor="VIIRS"
        ),
        HistoricalEvent(
            id="HIST-2024-019",
            incident_date="2024-05-04",
            location_id="LOC008",
            location_name="Aravalli Ridge Corridor",
            region="Rajasthan",
            latitude=27.3200,
            longitude=76.4300,
            max_risk_score=92.0,
            severity=RiskLevel.EXTREME,
            area_burned_hectares=310.0,
            containment_days=4,
            cause="Lightning Strike",
            temperature_at_ignition=44.5,
            wind_speed_at_ignition=38.0,
            humidity_at_ignition=11.0,
            soil_moisture_at_ignition=6.0,
            satellite_detection_sensor="MODIS"
        ),
        HistoricalEvent(
            id="HIST-2024-012",
            incident_date="2024-03-14",
            location_id="LOC005",
            location_name="Bandipur South Sector",
            region="Nilgiri Biosphere, Karnataka",
            latitude=11.6664,
            longitude=76.6291,
            max_risk_score=76.8,
            severity=RiskLevel.HIGH,
            area_burned_hectares=92.5,
            containment_days=2,
            cause="Dry Grass Ignition",
            temperature_at_ignition=35.2,
            wind_speed_at_ignition=22.0,
            humidity_at_ignition=31.0,
            soil_moisture_at_ignition=19.5,
            satellite_detection_sensor="VIIRS"
        ),
        HistoricalEvent(
            id="HIST-2023-008",
            incident_date="2023-04-20",
            location_id="LOC002",
            location_name="Bhimashankar Outer Range",
            region="Western Ghats, Maharashtra",
            latitude=19.0728,
            longitude=73.5358,
            max_risk_score=68.5,
            severity=RiskLevel.MODERATE,
            area_burned_hectares=38.0,
            containment_days=1,
            cause="Agricultural Fire Escape",
            temperature_at_ignition=33.5,
            wind_speed_at_ignition=18.0,
            humidity_at_ignition=38.0,
            soil_moisture_at_ignition=22.0,
            satellite_detection_sensor="MODIS"
        )
    ]

