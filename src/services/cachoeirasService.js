import api from './Api';

export const getAllCachoeiras = () => api.get('/cachoeiras');
export const createCachoeira = (data) => api.post('/cachoeiras', data);
export const updateCachoeira = (id, data) => api.put(`/cachoeiras/${id}`, data);
export const deleteCachoeira = (id) => api.delete(`/cachoeiras/${id}`); 