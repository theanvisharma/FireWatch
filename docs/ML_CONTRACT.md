# FireWatch AI — Machine Learning Model Contract
**Owner:** VEDANT (AI/ML Lead)  
**Consumer:** KHUSHI (Backend API) & ANVI (Frontend Dashboard)

---

## 1. Input Features Specification
The ML engine accepts numerical tabular features representing physical environmental factors:

| Feature Name | Type | Unit | Range | Description |
|---|---|---|---|---|
| `temperature` | Float | °C | -10.0 to 55.0 | Ambient surface air temperature |
| `wind_speed` | Float | km/h | 0.0 to 120.0 | Sustained wind velocity at 10m |
| `rainfall_72h`| Float | mm | 0.0 to 500.0 | Cumulative precipitation in past 72h |
| `soil_moisture`| Float | % | 0.0 to 100.0 | Volumetric surface soil moisture |
| `relative_humidity` | Float | % | 5.0 to 100.0 | Ambient relative humidity |
| `ndvi` | Float | [-1, 1] | -1.0 to 1.0 | Normalized Difference Vegetation Index |
| `slope` | Float | Degrees | 0.0 to 90.0 | Terrain steepness gradient |
| `elevation` | Float | Meters | -100 to 8000 | Digital elevation above sea level |

---

## 2. Standardized Output Schema
Every model inference response must return this exact JSON schema:

```json
{
  "location_id": "LOC001",
  "latitude": 18.52,
  "longitude": 73.85,
  "risk_score": 78.5,
  "risk_level": "High",
  "prediction_horizon": "24-72 hours",
  "factors": {
    "temperature": 38.0,
    "wind_speed": 25.0,
    "rainfall": 2.0,
    "soil_moisture": 18.0
  },
  "model_version": "v1",
  "generated_at": "2026-11-11T10:00:00Z"
}
```

---

## 3. Risk Classification Thresholds
Risk scores range from `0.0` to `100.0`:

- `0.0 - 34.9` -> **Low** (`#43A879`)
- `35.0 - 54.9` -> **Moderate** (`#D5B34A`)
- `55.0 - 74.9` -> **High** (`#DB873A`)
- `75.0 - 87.9` -> **Very High** (`#D95343`)
- `88.0 - 100.0` -> **Extreme** (`#8F2528`)

---

## 4. Minimum Evaluation Criteria
- **ROC-AUC:** >= 0.85 on out-of-time test set.
- **Brier Score:** <= 0.12 (well-calibrated probabilities).
- **Inference Latency:** < 50ms per single inference, < 500ms for batch of 1,000 spatial cells.

