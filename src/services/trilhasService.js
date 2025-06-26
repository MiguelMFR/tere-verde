import api from './Api';

export const getAllTrilhas = () => api.get('/trilhas');
export const createTrilha = (data) => api.post('/trilhas', data);
export const updateTrilha = (id, data) => api.put(`/trilhas/${id}`, data);
export const deleteTrilha = (id) => api.delete(`/trilhas/${id}`); 