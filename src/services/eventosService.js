import api from './Api';

export const getAllEventos = () => api.get('/eventos');
export const createEvento = (data) => api.post('/eventos', data);
export const updateEvento = (id, data) => api.put(`/eventos/${id}`, data);
export const deleteEvento = (id) => api.delete(`/eventos/${id}`); 