"""
Piyusha's Spatial Grid Generator.
Discretizes geographic regions into uniform hexagonal or rectangular cells (e.g., 5km x 5km)
for spatial raster overlay and risk modeling.
"""
import math
from typing import List, Dict, Any


def generate_bounding_box_grid(
    min_lat: float,
    max_lat: float,
    min_lon: float,
    max_lon: float,
    step_deg: float = 0.05
) -> List[Dict[str, Any]]:
    """
    Generates a regular latitude/longitude grid.

    The returned bbox rings use [latitude, longitude] pairs to match the
    existing API contract. Edge cells are clipped to the requested bounds.
    """
    if not all(math.isfinite(value) for value in (min_lat, max_lat, min_lon, max_lon, step_deg)):
        raise ValueError("Bounds and step_deg must be finite numbers.")
    if not (-90 <= min_lat < max_lat <= 90):
        raise ValueError("Latitude bounds must satisfy -90 <= min_lat < max_lat <= 90.")
    if not (-180 <= min_lon < max_lon <= 180):
        raise ValueError("Longitude bounds must satisfy -180 <= min_lon < max_lon <= 180.")
    if step_deg <= 0:
        raise ValueError("step_deg must be greater than zero.")

    cells = []
    lat = min_lat
    cell_idx = 1
    
    while lat < max_lat:
        cell_max_lat = min(lat + step_deg, max_lat)
        if cell_max_lat <= lat:
            raise ValueError("step_deg is too small to advance the latitude grid.")
        lon = min_lon
        while lon < max_lon:
            cell_max_lon = min(lon + step_deg, max_lon)
            if cell_max_lon <= lon:
                raise ValueError("step_deg is too small to advance the longitude grid.")
            cell = {
                "cell_id": f"GRID-{cell_idx:04d}",
                "center_lat": round((lat + cell_max_lat) / 2, 6),
                "center_lon": round((lon + cell_max_lon) / 2, 6),
                "bbox": [
                    [round(lat, 4), round(lon, 4)],
                    [round(cell_max_lat, 4), round(lon, 4)],
                    [round(cell_max_lat, 4), round(cell_max_lon, 4)],
                    [round(lat, 4), round(cell_max_lon, 4)],
                    [round(lat, 4), round(lon, 4)]
                ]
            }
            cells.append(cell)
            cell_idx += 1
            lon = cell_max_lon
        lat = cell_max_lat
        
    return cells


def grid_to_geojson(cells: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Converts generated cells to an RFC 7946 FeatureCollection."""
    features = []
    for cell in cells:
        ring = [[longitude, latitude] for latitude, longitude in cell["bbox"]]
        features.append({
            "type": "Feature",
            "id": cell["cell_id"],
            "geometry": {"type": "Polygon", "coordinates": [ring]},
            "properties": {
                "cell_id": cell["cell_id"],
                "center_lat": cell["center_lat"],
                "center_lon": cell["center_lon"],
            },
        })
    return {"type": "FeatureCollection", "features": features}


if __name__ == "__main__":
    # Test Western Ghats regional grid slice
    grid = generate_bounding_box_grid(18.5, 19.2, 73.2, 73.8, step_deg=0.1)
    print(f"Generated {len(grid)} spatial grid cells.")
