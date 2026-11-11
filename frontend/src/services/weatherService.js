import { api } from './api';
import { MOCK_SECTORS } from './mockData';

export const weatherService = {
  /**
   * Fetches weather observation for a given sector
   */
  async getWeather(locationId) {
    const sector = MOCK_SECTORS.find((s) => s.id === locationId) || MOCK_SECTORS[0];

    const mockWeather = {
      location_id: sector.id,
      location_name: sector.name,
      latitude: sector.latitude,
      longitude: sector.longitude,
      temperature: sector.factors.temperature,
      feels_like: sector.factors.temperature + 2.4,
      humidity: sector.factors.relative_humidity,
      wind_speed: sector.factors.wind_speed,
      wind_direction: 'ENE',
      rainfall_past_24h: sector.factors.rainfall,
      soil_moisture: sector.factors.soil_moisture,
      solar_radiation: 880,
      vpd_kpa: 2.45,
      drought_index: 512,
      condition: sector.factors.temperature > 35 ? 'Hot & Arid' : 'Partly Cloudy',
      icon: 'sun',
      forecast: [
        { time: '00:00', temperature: sector.factors.temperature - 5, humidity: sector.factors.relative_humidity + 10, wind_speed: sector.factors.wind_speed - 4, precipitation_prob: 0.05 },
        { time: '04:00', temperature: sector.factors.temperature - 7, humidity: sector.factors.relative_humidity + 15, wind_speed: sector.factors.wind_speed - 6, precipitation_prob: 0.05 },
        { time: '08:00', temperature: sector.factors.temperature - 2, humidity: sector.factors.relative_humidity + 5, wind_speed: sector.factors.wind_speed - 1, precipitation_prob: 0.05 },
        { time: '12:00', temperature: sector.factors.temperature + 2, humidity: sector.factors.relative_humidity - 5, wind_speed: sector.factors.wind_speed + 3, precipitation_prob: 0.05 },
        { time: '16:00', temperature: sector.factors.temperature + 1, humidity: sector.factors.relative_humidity - 4, wind_speed: sector.factors.wind_speed + 2, precipitation_prob: 0.05 },
        { time: '20:00', temperature: sector.factors.temperature - 3, humidity: sector.factors.relative_humidity + 6, wind_speed: sector.factors.wind_speed - 2, precipitation_prob: 0.05 },
      ],
      recorded_at: new Date().toISOString(),
    };

    if (api.isMockMode()) {
      return { data: mockWeather, isMock: true };
    }
    try {
      const data = await api.get(`/weather/${locationId}`);
      return { data, isMock: false };
    } catch (error) {
      console.warn(`[WeatherService] Fallback to mock for location ${locationId}:`, error.message);
      return { data: mockWeather, isMock: true, fallback: true };
    }
  },
};

