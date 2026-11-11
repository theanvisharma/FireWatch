# FireWatch AI — GIS, Satellite Data Pipeline & Deployment
**Module Owner: PIYUSHA (GIS, Geospatial & Deployment Engineer)**

This directory contains the initial GIS data-processing foundation for FireWatch AI.

---

## 🛰️ Piyusha's Core Objectives
1. **Satellite Remote Sensing Ingestion:**
   - Ingest NASA FIRMS thermal anomaly coordinates (MODIS & VIIRS active fire products).
   - Ingest Sentinel-2 multispectral imagery for NDVI computation.
2. **Terrain & Topography Processing:**
   - Calculate slope angle and aspect using SRTM 30m Digital Elevation Models (DEM).
   - Compute slope-driven rate of spread acceleration multipliers.
3. **Geospatial Discretization:**
   - Generate uniform spatial grid cells across target surveillance regions.
   - Load spatial geometry polygons into PostGIS using EPSG:4326.
4. **DevOps & Container Infrastructure:**
   - Provide repeatable local and containerized GIS processing.

---

## 📂 Module Structure
```
gis-pipeline/
├── satellite/          <- NASA FIRMS MODIS/VIIRS thermal hotspot connector
│   └── modis_viirs_fetcher.py
├── vegetation/         <- Sentinel-2 NDVI calculation and fuel classification
│   └── ndvi_processing.py
├── terrain/            <- SRTM Digital Elevation Model slope & aspect processor
│   └── slope_elevation.py
├── geospatial/         <- Grid cell generator and PostGIS ingestion bridge
│   ├── grid_generator.py
│   ├── geojson_export.py
│   └── postgis_loader.py
├── run_pipeline.py     <- FIRMS-to-GeoJSON batch entry point
├── tests/              <- Deterministic foundation tests
├── Dockerfile          <- Multi-stage container with GDAL/PROJ dependencies
├── requirements.txt    <- Geospatial dependencies (rasterio, geopandas, shapely)
└── README.md
```

## Run the initial pipeline

From the repository root in PowerShell:

```powershell
py -m pip install -r gis-pipeline\requirements.txt
py gis-pipeline\run_pipeline.py
```

By default this writes simulated sample hotspots to
`gis-pipeline\data\hotspots.geojson`. To retrieve real FIRMS data, set
`NASA_FIRMS_MAP_KEY` and pass `--live`:

```powershell
$env:NASA_FIRMS_MAP_KEY = "your-key"
py gis-pipeline\run_pipeline.py --live --output gis-pipeline\data\hotspots.geojson
```

Or run the optional Docker Compose job from the repository root:

```powershell
docker compose --profile gis run --rm gis-pipeline
```

That Compose command uses simulated data. To request live FIRMS data, provide
`NASA_FIRMS_MAP_KEY` and override the command with `--live`.

The output is an RFC 7946 GeoJSON `FeatureCollection` with hotspot point
coordinates in `[longitude, latitude]` order. Run the foundational tests with:

```powershell
py -m unittest discover -s gis-pipeline\tests
```

## Foundation scope and remaining integration

The batch export and grid geometry are deterministic and locally testable.
Satellite ingestion currently covers FIRMS hotspots only; Sentinel-2, terrain,
and soil-moisture routines remain processing primitives, not connected data
feeds. The PostGIS loader is still a placeholder, and this output is not yet
consumed by the backend risk-map, ML inference, or alert APIs. Those integrations,
deployment hardening, and end-to-end testing remain follow-up work.
