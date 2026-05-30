const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export async function submitContactMessage(payload) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    const networkError = new Error(
      'Unable to reach the contact service. Please make sure the backend server is running and try again.',
    );
    networkError.details = [];
    networkError.cause = error;
    throw networkError;
  }

  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    const error = new Error(data.message || 'Failed to submit contact message.');
    error.details = data.errors || [];
    throw error;
  }

  return data;
}
