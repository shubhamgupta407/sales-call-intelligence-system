/**
 * CENTRALIZED API UTILITY (PRODUCTION GRADE)
 * ---
 * Handles all communications with https://sales-ai-backend-d14w.onrender.com
 * Includes automatic token management and error handling.
 */

// Use relative paths in development to leverage the Vite proxy (bypasses CORS)
const BASE_URL = 'https://sales-ai-backend-d14w.onrender.com';

export const api = {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('synthex_auth_token');
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    };

    // Use a robust timeout for Render free tier wake-up + AI processing latency
    // 5 minutes is the industry standard for cold-start AI inference
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 300000); // 300s timeout

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("ENDPOINT_NOT_FOUND");
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.message || `API Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error("SYSTEM_INITIALIZING");
      }
      if (error.message === "Failed to fetch") {
        throw new Error("NETWORK_UNREACHABLE");
      }
      console.error(`[API ERROR] ${endpoint}:`, error);
      throw error;
    }
  },

  auth: {
    login: (credentials) => api.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
    signup: (data) => api.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  },

  calls: {
    list: () => api.request('/api/v1/calls'),
    get: (id) => api.request(`/api/v1/calls/${id}`),
    analyze: (query) => api.request('/analyze', {
      method: 'POST',
      body: JSON.stringify({ query }),
    }),
    create: (callData) => api.request('/api/v1/calls', {
      method: 'POST',
      body: JSON.stringify(callData),
    }),
  },
};
