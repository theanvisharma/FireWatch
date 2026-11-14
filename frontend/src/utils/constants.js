export const RISK_LEVELS = {
  LOW: 'Low',
  MODERATE: 'Moderate',
  HIGH: 'High',
  VERY_HIGH: 'Very High',
  EXTREME: 'Extreme',
};

export const RISK_COLORS = {
  Low: '#43A879',
  Moderate: '#D5B34A',
  High: '#DB873A',
  'Very High': '#D95343',
  Extreme: '#8F2528',
};

export const RISK_BG_COLORS = {
  Low: 'rgba(67, 168, 121, 0.14)',
  Moderate: 'rgba(213, 179, 74, 0.14)',
  High: 'rgba(219, 135, 58, 0.14)',
  'Very High': 'rgba(217, 83, 67, 0.14)',
  Extreme: 'rgba(143, 37, 40, 0.18)',
};

export const RISK_BORDER_COLORS = {
  Low: 'rgba(67, 168, 121, 0.35)',
  Moderate: 'rgba(213, 179, 74, 0.35)',
  High: 'rgba(219, 135, 58, 0.35)',
  'Very High': 'rgba(217, 83, 67, 0.35)',
  Extreme: 'rgba(143, 37, 40, 0.45)',
};

export const SEVERITY_ORDER = {
  Low: 1,
  Moderate: 2,
  High: 3,
  'Very High': 4,
  Extreme: 5,
};

export const DEFAULT_MAP_CENTER = [18.7557, 73.4091]; // Western Ghats, Maharashtra
export const DEFAULT_MAP_ZOOM = 7;

export const TEAM_MEMBERS = [
  {
    name: 'ANVI',
    role: 'Frontend & UI/UX Lead',
    module: 'frontend/',
    desc: 'React SPA, dark/light geospatial design system, Leaflet interactive risk map, telemetry dashboards, state orchestration.',
    color: '#D97735',
  },
  {
    name: 'VEDANT',
    role: 'AI / Machine Learning Lead',
    module: 'ai-engine/',
    desc: 'Feature engineering, XGBoost / Random Forest ignition risk models, probability calibration, SHAP explanations.',
    color: '#43A879',
  },
  {
    name: 'KHUSHI',
    role: 'Backend & Database Lead',
    module: 'backend/',
    desc: 'FastAPI services, PostgreSQL + PostGIS spatial tables, live weather connectors, API contract validation.',
    color: '#D5B34A',
  },
  {
    name: 'PIYUSHA',
    role: 'GIS & Deployment Lead',
    module: 'gis-pipeline/',
    desc: 'NASA FIRMS (MODIS/VIIRS) ingestion, Sentinel-2 NDVI, SRTM terrain analysis, Docker orchestration.',
    color: '#DB873A',
  },
];
