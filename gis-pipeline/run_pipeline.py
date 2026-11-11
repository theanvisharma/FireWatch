"""Fetch FIRMS hotspots and export a GeoJSON point layer."""

import argparse
import json
import os
from pathlib import Path

from geospatial.geojson_export import hotspots_to_geojson
from satellite.modis_viirs_fetcher import FirmsHotspotFetcher


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    default_output = Path(__file__).resolve().parent / "data" / "hotspots.geojson"
    parser.add_argument("--output", default=str(default_output))
    parser.add_argument("--country", default="IND")
    parser.add_argument("--days", type=int, default=1)
    parser.add_argument("--source", default="VIIRS_SNPP_NRT")
    parser.add_argument(
        "--live",
        action="store_true",
        help="Use the NASA FIRMS API; requires NASA_FIRMS_MAP_KEY.",
    )
    args = parser.parse_args()

    api_key = os.getenv("NASA_FIRMS_MAP_KEY")
    if args.live and not api_key:
        parser.error("--live requires NASA_FIRMS_MAP_KEY to be set.")

    fetcher = FirmsHotspotFetcher(api_key=api_key if args.live else None)
    frame = fetcher.fetch_recent_hotspots(
        country_code=args.country,
        days=args.days,
        source=args.source,
    )
    data_source_mode = "NASA_FIRMS" if args.live else "SIMULATED_DEMO_DATA"
    geojson = hotspots_to_geojson(
        frame.to_dict(orient="records"),
        data_source_mode=data_source_mode,
    )

    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    with output.open("w", encoding="utf-8") as output_file:
        json.dump(geojson, output_file, indent=2, allow_nan=False)
        output_file.write("\n")

    print(f"Wrote {len(geojson['features'])} {data_source_mode} hotspots to {output}")


if __name__ == "__main__":
    main()
