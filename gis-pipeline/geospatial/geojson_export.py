"""Helpers for exporting GIS source records as RFC 7946 GeoJSON."""

import math
from datetime import date, datetime
from typing import Any, Dict, Iterable


def hotspots_to_geojson(
    records: Iterable[Dict[str, Any]], data_source_mode: str
) -> Dict[str, Any]:
    """Convert FIRMS-like records to point features using GeoJSON lon/lat order."""
    features = []
    for row_number, record in enumerate(records, start=1):
        try:
            latitude = float(record["latitude"])
            longitude = float(record["longitude"])
        except (KeyError, TypeError, ValueError) as error:
            raise ValueError(
                f"Hotspot record {row_number} must include numeric latitude and longitude."
            ) from error

        if not (math.isfinite(latitude) and -90 <= latitude <= 90):
            raise ValueError(f"Hotspot record {row_number} has invalid latitude.")
        if not (math.isfinite(longitude) and -180 <= longitude <= 180):
            raise ValueError(f"Hotspot record {row_number} has invalid longitude.")

        properties = {
            key: _json_value(value)
            for key, value in record.items()
            if key not in {"latitude", "longitude"}
        }
        features.append({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [longitude, latitude],
            },
            "properties": properties,
        })

    return {
        "type": "FeatureCollection",
        "data_source_mode": data_source_mode,
        "features": features,
    }


def _json_value(value: Any) -> Any:
    if value is None:
        return None
    if hasattr(value, "item"):
        value = value.item()
    if isinstance(value, (datetime, date)):
        return value.isoformat()
    if isinstance(value, float) and not math.isfinite(value):
        return None
    if isinstance(value, (str, int, float, bool)):
        return value
    return str(value)
