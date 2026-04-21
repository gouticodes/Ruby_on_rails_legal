import apiClient from './client';

export const authApi = {
  login: (payload) => apiClient.post('/auth/login', payload),
  register: (payload) => apiClient.post('/auth/register', payload),
  me: () => apiClient.get('/auth/me'),
};

export const casesApi = {
  list: (params) => apiClient.get('/cases', { params }),
  create: (payload) => apiClient.post('/cases', payload),
  update: (id, payload) => apiClient.patch(`/cases/${id}`, payload),
  remove: (id) => apiClient.delete(`/cases/${id}`),
};

export const documentsApi = {
  list: () => apiClient.get('/documents'),
  upload: (formData) =>
    apiClient.post('/documents', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

export const auditApi = {
  list: () => apiClient.get('/audit_logs'),
};

export const profileApi = {
  get: () => apiClient.get('/profile'),
  update: (payload) => apiClient.patch('/profile', payload),
};

export const dashboardApi = {
  stats: () => apiClient.get('/dashboard'),
};
