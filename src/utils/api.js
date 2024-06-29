const API_BASE_URL = '/api';

const api = {
  getAllIdeas: async () => {
    const response = await fetch(`${API_BASE_URL}/ideas`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }
    const result = await response.json();
    return result.data || []; // Ensure to return an array
  }
};

export default api;
