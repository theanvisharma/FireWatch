// Centralized Mock Data for FireWatch AI Frontend
// Isolated repository of realistic demonstration telemetry and geospatial data.

export const MOCK_SECTORS = [
  {
    id: "LOC001",
    name: "Khandala-Lonavala Ridge (Western Ghats)",
    region: "Western Ghats, Maharashtra",
    latitude: 18.7557,
    longitude: 73.4091,
    risk_score: 84.5,
    risk_level: "Very High",
    prediction_horizon: "24-72 hours",
    polygon: [
      [18.7157, 73.3691],
      [18.7957, 73.3691],
      [18.7957, 73.4491],
      [18.7157, 73.4491],
      [18.7157, 73.3691]
    ],
    factors: {
      temperature: 37.8,
      wind_speed: 28.4,
      rainfall: 0.0,
      soil_moisture: 14.2,
      relative_humidity: 26.0,
      ndvi: 0.28,
      slope: 24.5
    },
    active_incidents: 0,
    confidence: 0.94,
    summary: "Steep rocky escarpment with dry deciduous scrub. Strong afternoon wind gusts through canyon passes create high ignition hazard.",
    updated_at: new Date(Date.now() - 15 * 60000).toISOString()
  },
  {
    id: "LOC002",
    name: "Bhimashankar Wildlife Corridor",
    region: "Western Ghats, Maharashtra",
    latitude: 19.0728,
    longitude: 73.5358,
    risk_score: 72.0,
    risk_level: "High",
    prediction_horizon: "24-72 hours",
    polygon: [
      [19.0328, 73.4958],
      [19.1128, 73.4958],
      [19.1128, 73.5758],
      [19.0328, 73.5758],
      [19.0328, 73.4958]
    ],
    factors: {
      temperature: 34.2,
      wind_speed: 21.0,
      rainfall: 1.2,
      soil_moisture: 19.5,
      relative_humidity: 34.0,
      ndvi: 0.42,
      slope: 18.0
    },
    active_incidents: 0,
    confidence: 0.91,
    summary: "Dense evergreen forest fringes undergoing rapid seasonal drying. High litterfall accumulation noted in lower ravines.",
    updated_at: new Date(Date.now() - 25 * 60000).toISOString()
  },
  {
    id: "LOC003",
    name: "Mahabaleshwar Plateau Edge",
    region: "Western Ghats, Maharashtra",
    latitude: 17.9237,
    longitude: 73.6586,
    risk_score: 48.0,
    risk_level: "Moderate",
    prediction_horizon: "24-72 hours",
    polygon: [
      [17.8837, 73.6186],
      [17.9637, 73.6186],
      [17.9637, 73.6986],
      [17.8837, 73.6986],
      [17.8837, 73.6186]
    ],
    factors: {
      temperature: 29.5,
      wind_speed: 15.2,
      rainfall: 4.5,
      soil_moisture: 32.0,
      relative_humidity: 52.0,
      ndvi: 0.58,
      slope: 14.0
    },
    active_incidents: 0,
    confidence: 0.88,
    summary: "High elevation plateau with stable moisture buffer from recent light showers. Low probability of uncontained ignition.",
    updated_at: new Date(Date.now() - 40 * 60000).toISOString()
  },
  {
    id: "LOC004",
    name: "Satpura Dry Deciduous Reserve",
    region: "Central Highlands, MP",
    latitude: 22.4633,
    longitude: 78.4344,
    risk_score: 91.2,
    risk_level: "Extreme",
    prediction_horizon: "24-72 hours",
    polygon: [
      [22.4233, 78.3944],
      [22.5033, 78.3944],
      [22.5033, 78.4744],
      [22.4233, 78.4744],
      [22.4233, 78.3944]
    ],
    factors: {
      temperature: 41.5,
      wind_speed: 32.0,
      rainfall: 0.0,
      soil_moisture: 9.8,
      relative_humidity: 18.0,
      ndvi: 0.21,
      slope: 16.5
    },
    active_incidents: 1,
    confidence: 0.96,
    summary: "Severe drought conditions with surface temperatures exceeding 41°C. Fine fuel moisture content critical (<5%).",
    updated_at: new Date(Date.now() - 8 * 60000).toISOString()
  },
  {
    id: "LOC005",
    name: "Bandipur Buffer Boundary",
    region: "Nilgiri Biosphere, Karnataka",
    latitude: 11.6664,
    longitude: 76.6291,
    risk_score: 63.8,
    risk_level: "High",
    prediction_horizon: "24-72 hours",
    polygon: [
      [11.6264, 76.5891],
      [11.7064, 76.5891],
      [11.7064, 76.6691],
      [11.6264, 76.6691],
      [11.6264, 76.5891]
    ],
    factors: {
      temperature: 33.0,
      wind_speed: 19.5,
      rainfall: 2.0,
      soil_moisture: 24.0,
      relative_humidity: 41.0,
      ndvi: 0.47,
      slope: 11.0
    },
    active_incidents: 0,
    confidence: 0.90,
    summary: "Teak and bamboo dry deciduous mix. Flammability elevated along southern agricultural perimeter interface.",
    updated_at: new Date(Date.now() - 55 * 60000).toISOString()
  },
  {
    id: "LOC006",
    name: "Similipal Sal Forest Zone",
    region: "Mayurbhanj, Odisha",
    latitude: 21.8600,
    longitude: 86.3400,
    risk_score: 79.4,
    risk_level: "Very High",
    prediction_horizon: "24-72 hours",
    polygon: [
      [21.8200, 86.3000],
      [21.9000, 86.3000],
      [21.9000, 86.3800],
      [21.8200, 86.3800],
      [21.8200, 86.3000]
    ],
    factors: {
      temperature: 38.6,
      wind_speed: 25.0,
      rainfall: 0.0,
      soil_moisture: 16.0,
      relative_humidity: 28.0,
      ndvi: 0.35,
      slope: 19.0
    },
    active_incidents: 0,
    confidence: 0.93,
    summary: "Massive sal tree leaf fall forming continuous ground tinder bed. Zero precipitation recorded in past 16 days.",
    updated_at: new Date(Date.now() - 32 * 60000).toISOString()
  },
  {
    id: "LOC007",
    name: "Wayanad Foothills Transition",
    region: "Western Ghats, Kerala",
    latitude: 11.6854,
    longitude: 76.1320,
    risk_score: 32.5,
    risk_level: "Low",
    prediction_horizon: "24-72 hours",
    polygon: [
      [11.6454, 76.0920],
      [11.7254, 76.0920],
      [11.7254, 76.1720],
      [11.6454, 76.1720],
      [11.6454, 76.0920]
    ],
    factors: {
      temperature: 27.8,
      wind_speed: 12.0,
      rainfall: 14.0,
      soil_moisture: 48.0,
      relative_humidity: 68.0,
      ndvi: 0.72,
      slope: 15.0
    },
    active_incidents: 0,
    confidence: 0.95,
    summary: "High moisture retention and active precipitation maintain negligible ignition susceptibility.",
    updated_at: new Date(Date.now() - 70 * 60000).toISOString()
  },
  {
    id: "LOC008",
    name: "Sariska Scrub & Ravine Zone",
    region: "Aravalli Range, Rajasthan",
    latitude: 27.3200,
    longitude: 76.4300,
    risk_score: 88.0,
    risk_level: "Extreme",
    prediction_horizon: "24-72 hours",
    polygon: [
      [27.2800, 76.3900],
      [27.3600, 76.3900],
      [27.3600, 76.4700],
      [27.2800, 76.4700],
      [27.2800, 76.3900]
    ],
    factors: {
      temperature: 42.0,
      wind_speed: 30.0,
      rainfall: 0.0,
      soil_moisture: 8.0,
      relative_humidity: 15.0,
      ndvi: 0.18,
      slope: 10.0
    },
    active_incidents: 0,
    confidence: 0.95,
    summary: "Arid scrubland with high solar insolation and extremely low dew points. Dry lightning risks monitored.",
    updated_at: new Date(Date.now() - 12 * 60000).toISOString()
  }
];

export const MOCK_ALERTS = [
  {
    id: "ALT-1092",
    location_id: "LOC004",
    location_name: "Satpura Dry Deciduous Reserve",
    latitude: 22.4633,
    longitude: 78.4344,
    severity: "Extreme",
    risk_score: 91.2,
    timestamp: new Date(Date.now() - 18 * 60000).toISOString(),
    message: "Extreme fuel flammability threshold exceeded. Volumetric soil moisture fallen below 10%.",
    preventive_action: "Mobilize rapid forest ranger patrol. Restrict tourist vehicle entry into Sector 4 fire-corridor.",
    is_read: false,
    status: "active",
    affected_radius_km: 25.0
  },
  {
    id: "ALT-1088",
    location_id: "LOC008",
    location_name: "Sariska Scrub & Ravine Zone",
    latitude: 27.3200,
    longitude: 76.4300,
    severity: "Extreme",
    risk_score: 88.0,
    timestamp: new Date(Date.now() - 42 * 60000).toISOString(),
    message: "Dry winds exceeding 30 km/h with 42°C surface temperature creating severe fire hazard.",
    preventive_action: "Pre-position local water bowsers at high-wind ridge crossings. Monitor thermal satellite feeds.",
    is_read: false,
    status: "active",
    affected_radius_km: 18.0
  },
  {
    id: "ALT-1081",
    location_id: "LOC001",
    location_name: "Khandala-Lonavala Ridge (Western Ghats)",
    latitude: 18.7557,
    longitude: 73.4091,
    severity: "Very High",
    risk_score: 84.5,
    timestamp: new Date(Date.now() - 130 * 60000).toISOString(),
    message: "Steep terrain slope combined with dry scrub vegetation produces critical chimney ignition conditions.",
    preventive_action: "Issue precautionary smoke alert to expressway authority. Inspect firebreaks along railway slopes.",
    is_read: false,
    status: "active",
    affected_radius_km: 15.0
  },
  {
    id: "ALT-1075",
    location_id: "LOC006",
    location_name: "Similipal Sal Forest Zone",
    latitude: 21.8600,
    longitude: 86.3400,
    severity: "High",
    risk_score: 79.4,
    timestamp: new Date(Date.now() - 300 * 60000).toISOString(),
    message: "Consistent zero rainfall over 14 days and leaf litter accumulation detected.",
    preventive_action: "Engage local Van Suraksha Samiti volunteers for controlled dampening of perimeter boundaries.",
    is_read: true,
    status: "active",
    affected_radius_km: 20.0
  },
  {
    id: "ALT-1064",
    location_id: "LOC002",
    location_name: "Bhimashankar Wildlife Corridor",
    latitude: 19.0728,
    longitude: 73.5358,
    severity: "High",
    risk_score: 72.0,
    timestamp: new Date(Date.now() - 480 * 60000).toISOString(),
    message: "Humidity dropped below 35% with moderate afternoon gusts along southern ridgeline.",
    preventive_action: "Deploy drone survey over dense tree canopy to detect early thermal hotspots.",
    is_read: true,
    status: "acknowledged",
    affected_radius_km: 12.0
  }
];

export const MOCK_HISTORICAL_EVENTS = [
  {
    id: "HIST-2025-001",
    incident_date: "2025-04-12",
    location_id: "LOC004",
    location_name: "Satpura Dry Deciduous Reserve",
    region: "Central Highlands, MP",
    latitude: 22.4633,
    longitude: 78.4344,
    max_risk_score: 94.2,
    severity: "Extreme",
    area_burned_hectares: 420.5,
    containment_days: 3,
    cause: "Dry Fuel Spark",
    temperature_at_ignition: 43.2,
    wind_speed_at_ignition: 34.0,
    humidity_at_ignition: 14.0,
    soil_moisture_at_ignition: 7.5,
    satellite_detection_sensor: "VIIRS"
  },
  {
    id: "HIST-2025-002",
    incident_date: "2025-03-29",
    location_id: "LOC006",
    location_name: "Similipal Core Biosphere",
    region: "Mayurbhanj, Odisha",
    latitude: 21.8600,
    longitude: 86.3400,
    max_risk_score: 86.0,
    severity: "Very High",
    area_burned_hectares: 185.0,
    containment_days: 2,
    cause: "Under Investigation",
    temperature_at_ignition: 39.8,
    wind_speed_at_ignition: 26.5,
    humidity_at_ignition: 22.0,
    soil_moisture_at_ignition: 13.0,
    satellite_detection_sensor: "MODIS"
  },
  {
    id: "HIST-2025-003",
    incident_date: "2025-02-18",
    location_id: "LOC001",
    location_name: "Khandala Valley Ghat",
    region: "Western Ghats, Maharashtra",
    latitude: 18.7557,
    longitude: 73.4091,
    max_risk_score: 81.5,
    severity: "Very High",
    area_burned_hectares: 64.0,
    containment_days: 1,
    cause: "Human Activity (Debris)",
    temperature_at_ignition: 36.0,
    wind_speed_at_ignition: 24.0,
    humidity_at_ignition: 29.0,
    soil_moisture_at_ignition: 17.0,
    satellite_detection_sensor: "VIIRS"
  },
  {
    id: "HIST-2024-019",
    incident_date: "2024-05-04",
    location_id: "LOC008",
    location_name: "Aravalli Ridge Corridor",
    region: "Rajasthan",
    latitude: 27.3200,
    longitude: 76.4300,
    max_risk_score: 92.0,
    severity: "Extreme",
    area_burned_hectares: 310.0,
    containment_days: 4,
    cause: "Lightning Strike",
    temperature_at_ignition: 44.5,
    wind_speed_at_ignition: 38.0,
    humidity_at_ignition: 11.0,
    soil_moisture_at_ignition: 6.0,
    satellite_detection_sensor: "MODIS"
  },
  {
    id: "HIST-2024-012",
    incident_date: "2024-03-14",
    location_id: "LOC005",
    location_name: "Bandipur South Sector",
    region: "Nilgiri Biosphere, Karnataka",
    latitude: 11.6664,
    longitude: 76.6291,
    max_risk_score: 76.8,
    severity: "High",
    area_burned_hectares: 92.5,
    containment_days: 2,
    cause: "Dry Grass Ignition",
    temperature_at_ignition: 35.2,
    wind_speed_at_ignition: 22.0,
    humidity_at_ignition: 31.0,
    soil_moisture_at_ignition: 19.5,
    satellite_detection_sensor: "VIIRS"
  },
  {
    id: "HIST-2023-008",
    incident_date: "2023-04-20",
    location_id: "LOC002",
    location_name: "Bhimashankar Outer Range",
    region: "Western Ghats, Maharashtra",
    latitude: 19.0728,
    longitude: 73.5358,
    max_risk_score: 68.5,
    severity: "Moderate",
    area_burned_hectares: 38.0,
    containment_days: 1,
    cause: "Agricultural Fire Escape",
    temperature_at_ignition: 33.5,
    wind_speed_at_ignition: 18.0,
    humidity_at_ignition: 38.0,
    soil_moisture_at_ignition: 22.0,
    satellite_detection_sensor: "MODIS"
  }
];

export const MOCK_DASHBOARD_SUMMARY = {
  system_status: "OPERATIONAL (PROTOTYPE SIMULATION)",
  last_updated: new Date().toISOString(),
  total_monitored_regions: 8,
  high_risk_locations: 4,
  active_alerts: 5,
  avg_wildfire_risk: 70.8,
  risk_distribution: [
    { category: "Low", count: 1, percentage: 12.5, color: "#43A879" },
    { category: "Moderate", count: 1, percentage: 12.5, color: "#D5B34A" },
    { category: "High", count: 2, percentage: 25.0, color: "#DB873A" },
    { category: "Very High", count: 2, percentage: 25.0, color: "#D95343" },
    { category: "Extreme", count: 2, percentage: 25.0, color: "#8F2528" }
  ],
  environmental_summary: {
    avg_temperature: 35.5,
    avg_humidity: 34.8,
    avg_wind_speed: 23.5,
    avg_soil_moisture: 21.8,
    drought_stress_status: "Moderate to Severe Deficit",
    drought_index_val: 462.0
  },
  recent_predictions: MOCK_SECTORS.slice(0, 4),
  recent_alerts: MOCK_ALERTS.slice(0, 3),
  data_disclaimer: "DEMO DATA: FireWatch AI prediction engine is running in prototype simulation mode."
};

