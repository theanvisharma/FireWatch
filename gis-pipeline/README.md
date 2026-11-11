# FireWatch AI — GIS, Satellite Data Pipeline & Deployment
**Module Owner: PIYUSHA (GIS, Geospatial & Deployment Engineer)**

This directory contains geospatial ingestion, raster processing, and container orchestration for FireWatch AI.

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
   - Maintain `docker-compose.yml` and container networking between Frontend, Backend, ML, and GIS.

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
│   └── postgis_loader.py
├── Dockerfile          <- Multi-stage container with GDAL/PROJ dependencies
├── requirements.txt    <- Geospatial dependencies (rasterio, geopandas, shapely)
└── README.md
```

