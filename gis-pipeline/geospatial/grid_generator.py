"""
Piyusha's Spatial Grid Generator.
Discretizes geographic regions into uniform hexagonal or rectangular cells (e.g., 5km x 5km)
for spatial raster overlay and risk modeling.
"""
from typing import List, Dict, Any


def generate_bounding_box_grid(
    min_lat: float,
    max_lat: float,
    min_lon: float,
    max_lon: float,
    step_deg: float = 0.05
) -> List[Dict[str, Any]]:
    """
    Generates a regular spatial grid of bounding polygon cells.
    """
    cells = []
    lat = min_lat
    cell_idx = 1
    
    while lat < max_lat:
        lon = min_lon
        while lon < max_lon:
            cell = {
                "cell_id": f"GRID-{cell_idx:04d}",
                "center_lat": round(lat + step_deg / 2, 4),
                "center_lon": round(lon + step_deg / 2, 4),
                "bbox": [
                    [round(lat, 4), round(lon, 4)],
                    [round(lat + step_deg, 4), round(lon, 4)],
                    [round(lat + step_deg, 4), round(lon + step_deg, 4)],
                    [round(lat, 4), round(lon + step_deg, 4)],
                    [round(lat, 4), round(lon, 4)]
                ]
            }
            cells.append(cell)
            cell_idx += 1
            lon += step_deg
        lat += step_deg
        
    return cells


if __name__ == "__main__":
    # Test Western Ghats regional grid slice
    grid = generate_bounding_box_grid(18.5, 19.2, 73.2, 73.8, step_deg=0.1)
    print(f"Generated {len(grid)} spatial grid cells.")

