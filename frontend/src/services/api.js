/**
 * Centralized API Client for FireWatch AI
 * Handles both Mock Mode and Live Backend REST calls seamlessly.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
const FORCE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true';

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

async function request(endpoint, options = {}) {
  // If explicitly configured for mock mode, short-circuit
  if (FORCE_MOCK) {
    return null; // Handled by respective service methods
  }

  const url = `${BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { detail: response.statusText };
      }
      throw new ApiError(errorData.detail || 'An unexpected error occurred', response.status, errorData);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // Network or server unreachable: propagate error for graceful fallback
    throw new ApiError(error.message || 'Network connection failed', 0, null);
  }
}

export const api = {
  get: (endpoint, options) => request(endpoint, { method: 'GET', ...options }),
  post: (endpoint, body, options) => request(endpoint, { method: 'POST', body: JSON.stringify(body), ...options }),
  patch: (endpoint, body, options) => request(endpoint, { method: 'PATCH', body: JSON.stringify(body), ...options }),
  delete: (endpoint, options) => request(endpoint, { method: 'DELETE', ...options }),
  isMockMode: () => FORCE_MOCK,
  getBaseUrl: () => BASE_URL,
};

