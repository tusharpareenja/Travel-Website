import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// Intercept requests to add the Authorization header
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;

export async function getLocationInfo(locationName) {
  try {
    const response = await fetch(`${API_BASE_URL}/gemini/info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ place: locationName }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch location information');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching location information:', error);
    throw error;
  }
}