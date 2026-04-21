const BASE_URL = (window.APP_CONFIG?.BASE_URL || '/api').replace(/\/$/, '');

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    ...options
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `HTTP ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

const api = {
  getUsers: () => request('/users'),
  getCases: () => request('/cases'),
  createCase: (payload) => request('/cases', { method: 'POST', body: JSON.stringify(payload) }),
  updateCase: (id, payload) => request(`/cases/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteCase: (id) => request(`/cases/${id}`, { method: 'DELETE' }),
  getDocuments: () => request('/documents')
};
