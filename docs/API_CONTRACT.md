# FireWatch AI — API Contract Specification
**Version:** 1.0.0  
**Base URL:** `http://localhost:8000/api/v1`  
**Protocol:** REST / JSON  
**Auth:** Bearer Token (ready for v2, unauthenticated in prototype mode)

---

## 1. System Health
### `GET /health`
Validates container health, simulation state, and version.

**Response (200 OK):**
```json
{
  "status": "healthy",
  "service": "FireWatch AI Backend Engine",
  "timestamp": "2026-11-11T10:00:00Z",
  "version": "1.0.0",
  "mock_mode": true,
  "environment": "development"
}
```

---

## 2. Dashboard Summary
### `GET /api/v1/dashboard/summary`
Returns high-level surveillance metrics, risk level distributions, and active alert counters.

**Response (200 OK):**
```json
{
  "system_status": "OPERATIONAL (PROTOTYPE DEMO)",
  "last_updated": "2026-11-11T10:00:00Z",
  "total_monitored_regions": 8,
  "high_risk_locations": 4,
  "active_alerts": 5,
  "avg_wildfire_risk": 70.8,
  "risk_distribution": [
    { "category": "Low", "count": 1, "percentage": 12.5, "color": "#43A879" },
    { "category": "Moderate", "count": 1, "percentage": 12.5, "color": "#D5B34A" },
    { "category": "High", "count": 2, "percentage": 25.0, "color": "#DB873A" },
    { "category": "Very High", "count": 2, "percentage": 25.0, "color": "#D95343" },
    { "category": "Extreme", "count": 2, "percentage": 25.0, "color": "#8F2528" }
  ],
  "environmental_summary": {
    "avg_temperature": 35.5,
    "avg_humidity": 34.8,
    "avg_wind_speed": 23.5,
    "avg_soil_moisture": 21.8,
    "drought_stress_status": "Moderate to Severe Deficit",
    "drought_index_val": 462.0
  },
  "recent_predictions": [...],
  "recent_alerts": [...],
  "data_disclaimer": "DEMO DATA: FireWatch AI prediction engine is running in prototype simulation mode."
}
```

---

## 3. Interactive Risk Map
### `GET /api/v1/risk-map`
Provides geospatial polygon zones and coordinate points for the Leaflet interactive map.

**Response (200 OK):**
```json
{
  "total_zones": 8,
  "high_risk_zones": 4,
  "timestamp": "2026-11-11T10:00:00Z",
  "data_source_mode": "SIMULATED_DEMO_DATA",
  "features": [
    {
      "id": "LOC001",
      "name": "Khandala-Lonavala Ridge (Western Ghats)",
      "latitude": 18.7557,
      "longitude": 73.4091,
      "risk_score": 84.5,
      "risk_level": "Very High",
      "polygon": [
        [18.7157, 73.3691],
        [18.7957, 73.3691],
        [18.7957, 73.4491],
        [18.7157, 73.4491],
        [18.7157, 73.3691]
      ],
      "factors": {
        "temperature": 37.8,
        "wind_speed": 28.4,
        "rainfall": 0.0,
        "soil_moisture": 14.2,
        "relative_humidity": 26.0,
        "ndvi": 0.28,
        "slope": 24.5
      },
      "active_incidents": 0,
      "updated_at": "2026-11-11T09:45:00Z"
    }
  ]
}
```

---

## 4. Single Location Risk Detail
### `GET /api/v1/risk/{location_id}`
Returns granular telemetry and model factors for a specific monitored sector.

**Response (200 OK):**
```json
{
  "location_id": "LOC001",
  "location_name": "Khandala-Lonavala Ridge (Western Ghats)",
  "latitude": 18.7557,
  "longitude": 73.4091,
  "risk_score": 84.5,
  "risk_level": "Very High",
  "prediction_horizon": "24-72 hours",
  "factors": {
    "temperature": 37.8,
    "wind_speed": 28.4,
    "rainfall": 0.0,
    "soil_moisture": 14.2,
    "relative_humidity": 26.0,
    "ndvi": 0.28,
    "slope": 24.5
  },
  "model_version": "v1.0-xgb-demo",
  "generated_at": "2026-11-11T10:00:00Z",
  "confidence": 0.93,
  "summary": "Analysis for Khandala-Lonavala Ridge: Low precipitation index and high thermal gradient suggest active monitoring required."
}
```

---

## 5. On-Demand Risk Prediction
### `POST /api/v1/predictions`
Calculates custom prediction probability.

**Request Body:**
```json
{
  "latitude": 18.52,
  "longitude": 73.85,
  "temperature": 38.0,
  "wind_speed": 25.0,
  "rainfall": 2.0,
  "soil_moisture": 18.0,
  "relative_humidity": 28.0,
  "ndvi": 0.32,
  "slope": 16.0,
  "horizon_hours": 48
}
```

**Response (200 OK):**
```json
{
  "location_id": "PRED-1852-7385",
  "latitude": 18.52,
  "longitude": 73.85,
  "risk_score": 78.5,
  "risk_level": "High",
  "prediction_horizon": "48 hours",
  "factors": {
    "temperature": 38.0,
    "wind_speed": 25.0,
    "rainfall": 2.0,
    "soil_moisture": 18.0
  },
  "model_version": "v1",
  "generated_at": "2026-11-11T10:00:00Z",
  "confidence": 0.89,
  "top_contributing_factors": [
    "Elevated thermal stress (38.0°C)",
    "High wind velocity (25.0 km/h)",
    "Critical soil moisture deficit (18.0%)"
  ],
  "is_simulation": true
}
```

---

## 6. Early Warnings & Alerts
### `GET /api/v1/alerts`
Returns list of active high-risk early warnings.

### `PATCH /api/v1/alerts/{alert_id}`
Updates read status or mitigation state.

---

## 7. Weather Telemetry
### `GET /api/v1/weather/{location_id}`
Returns live meteorology, drought index, vapor pressure deficit, and hourly forecast.

---

## 8. Historical Wildfire Records
### `GET /api/v1/historical-data`
Supports query parameters: `severity`, `region`, `min_area`.

