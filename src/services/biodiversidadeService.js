import api from './Api';

export const getAllBiodiversidade = () => api.get('/biodiversidade');
export const createBiodiversidade = (data) => api.post('/biodiversidade', data);
export const updateBiodiversidade = (id, data) => api.put(`/biodiversidade/${id}`, data);
export const deleteBiodiversidade = (id) => api.delete(`/biodiversidade/${id}`); 