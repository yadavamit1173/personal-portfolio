const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export async function fetchPortfolioContent(signal) {
  const response = await fetch(`${API_BASE_URL}/content`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to load portfolio content: ${response.status}`);
  }

  return response.json();
}
