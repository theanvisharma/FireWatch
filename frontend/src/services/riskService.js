import { api } from './api';
import { MOCK_DASHBOARD_SUMMARY, MOCK_SECTORS } from './mockData';

export const riskService = {
  /**
   * Fetches high-level summary metrics, risk distribution, and quick feeds
   */
  async getDashboardSummary() {
    if (api.isMockMode()) {
      return { data: MOCK_DASHBOARD_SUMMARY, isMock: true };
    }
    try {
      const data = await api.get('/dashboard/summary');
      return { data, isMock: false };
    } catch (error) {
      console.warn('[RiskService] Backend unreachable, falling back to prototype mock data:', error.message);
      return { data: MOCK_DASHBOARD_SUMMARY, isMock: true, fallback: true };
    }
  },

  /**
   * Fetches geospatial features for the interactive Leaflet map
   */
  async getRiskMap() {
    const mockMapPayload = {
      total_zones: MOCK_SECTORS.length,
      high_risk_zones: MOCK_SECTORS.filter((s) => s.risk_score >= 70).length,
      timestamp: new Date().toISOString(),
      data_source_mode: 'SIMULATED_DEMO_DATA',
      features: MOCK_SECTORS,
    };

    if (api.isMockMode()) {
      return { data: mockMapPayload, isMock: true };
    }
    try {
      const data = await api.get('/risk-map');
      return { data, isMock: false };
    } catch (error) {
      console.warn('[RiskService] Falling back to mock map layers:', error.message);
      return { data: mockMapPayload, isMock: true, fallback: true };
    }
  },

  /**
   * Fetches single location risk profile and factors
   */
  async getLocationRisk(locationId) {
    const defaultSector = MOCK_SECTORS.find((s) => s.id === locationId) || MOCK_SECTORS[0];

    if (api.isMockMode()) {
      return { data: defaultSector, isMock: true };
    }
    try {
      const data = await api.get(`/risk/${locationId}`);
      return { data, isMock: false };
    } catch (error) {
      console.warn(`[RiskService] Fallback to mock for location ${locationId}:`, error.message);
      return { data: defaultSector, isMock: true, fallback: true };
    }
  },

  /**
   * Fetches list of recent automated predictions
   */
  async getPredictions() {
    if (api.isMockMode()) {
      return { data: MOCK_SECTORS, isMock: true };
    }
    try {
      const data = await api.get('/predictions');
      return { data, isMock: false };
    } catch (error) {
      console.warn('[RiskService] Predictions fallback:', error.message);
      return { data: MOCK_SECTORS, isMock: true, fallback: true };
    }
  },

  /**
   * Request an on-demand prediction from the model API
   */
  async requestPrediction(payload) {
    if (api.isMockMode()) {
      // Realistic simulation calculation
      const tempFactor = Math.min(Math.max((payload.temperature - 20) * 1.5, 0), 35);
      const windFactor = Math.min((payload.wind_speed / 40) * 25, 25);
      const moistureFactor = Math.min(Math.max((35 - payload.soil_moisture) * 1.2, 0), 25);
      const rainRelief = Math.min(payload.rainfall * 3, 20);
      const raw = tempFactor + windFactor + moistureFactor - rainRelief;
      const score = Math.round(Math.min(Math.max(raw, 5), 98));

      let level = 'Low';
      if (score >= 88) level = 'Extreme';
      else if (score >= 75) level = 'Very High';
      else if (score >= 55) level = 'High';
      else if (score >= 35) level = 'Moderate';

      return {
        data: {
          location_id: `CUSTOM-${Date.now().toString().slice(-4)}`,
          latitude: payload.latitude,
          longitude: payload.longitude,
          risk_score: score,
          risk_level: level,
          prediction_horizon: `${payload.horizon_hours || 48} hours`,
          factors: {
            temperature: payload.temperature,
            wind_speed: payload.wind_speed,
            rainfall: payload.rainfall,
            soil_moisture: payload.soil_moisture,
          },
          model_version: 'v1.0-sim-client',
          generated_at: new Date().toISOString(),
          confidence: 0.91,
          is_simulation: true,
        },
        isMock: true,
      };
    }

    return await api.post('/predictions', payload);
  },
};

