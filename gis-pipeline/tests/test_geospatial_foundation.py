import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from geospatial.geojson_export import hotspots_to_geojson
from geospatial.grid_generator import generate_bounding_box_grid, grid_to_geojson


class GridGeneratorTests(unittest.TestCase):
    def test_grid_clips_partial_edge_cells(self):
        cells = generate_bounding_box_grid(10, 10.25, 20, 20.25, step_deg=0.1)

        self.assertEqual(len(cells), 9)
        self.assertEqual(cells[-1]["bbox"][2], [10.25, 20.25])

    def test_grid_rejects_invalid_bounds_and_step(self):
        with self.assertRaises(ValueError):
            generate_bounding_box_grid(10, 10, 20, 21)
        with self.assertRaises(ValueError):
            generate_bounding_box_grid(10, 11, 20, 21, step_deg=0)

    def test_grid_geojson_uses_longitude_latitude_order(self):
        cells = generate_bounding_box_grid(10, 11, 20, 21, step_deg=1)

        feature = grid_to_geojson(cells)["features"][0]
        self.assertEqual(feature["geometry"]["coordinates"][0][0], [20, 10])
        self.assertEqual(feature["geometry"]["type"], "Polygon")


class HotspotGeoJsonTests(unittest.TestCase):
    def test_converts_hotspot_record_to_geojson_point(self):
        result = hotspots_to_geojson(
            [{"latitude": 18.5, "longitude": 73.8, "frp": 12.4}],
            data_source_mode="SIMULATED_DEMO_DATA",
        )

        self.assertEqual(result["data_source_mode"], "SIMULATED_DEMO_DATA")
        self.assertEqual(
            result["features"][0]["geometry"]["coordinates"], [73.8, 18.5]
        )
        self.assertEqual(result["features"][0]["properties"]["frp"], 12.4)

    def test_rejects_invalid_coordinates(self):
        with self.assertRaises(ValueError):
            hotspots_to_geojson(
                [{"latitude": 91, "longitude": 73}],
                data_source_mode="test",
            )


if __name__ == "__main__":
    unittest.main()
