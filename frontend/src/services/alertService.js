import { api } from './api';
import { MOCK_ALERTS } from './mockData';

let localAlertsStore = [...MOCK_ALERTS];

export const alertService = {
  /**
   * Fetches active early warning alerts
   */
  async getAlerts() {
    if (api.isMockMode()) {
      return { data: [...localAlertsStore], isMock: true };
    }
    try {
      const data = await api.get('/alerts');
      return { data, isMock: false };
    } catch (error) {
      console.warn('[AlertService] Backend unreachable, using in-memory mock alerts:', error.message);
      return { data: [...localAlertsStore], isMock: true, fallback: true };
    }
  },

  /**
   * Marks alert as read or acknowledged
   */
  async updateAlertStatus(alertId, updates) {
    localAlertsStore = localAlertsStore.map((a) =>
      a.id === alertId ? { ...a, ...updates } : a
    );

    if (api.isMockMode()) {
      return { data: localAlertsStore.find((a) => a.id === alertId), isMock: true };
    }

    try {
      const data = await api.patch(`/alerts/${alertId}`, updates);
      return { data, isMock: false };
    } catch (error) {
      console.warn('[AlertService] Fallback updating local store:', error.message);
      return { data: localAlertsStore.find((a) => a.id === alertId), isMock: true, fallback: true };
    }
  },
};

