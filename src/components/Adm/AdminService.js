import { toast } from 'react-hot-toast';
import api from '../../services/Api';
import AdminAuthService from '../../services/adminAuthService';

class AdminService {
  static async fetchAllData(categories) {
    try {
      const headers = AdminAuthService.getAuthHeaders();
      const responses = await Promise.all(
        categories.map(category => api.get(`/${category.name}`, { headers }))
      );

      const newData = {};
      categories.forEach((category, index) => {
        newData[category.name] = responses[index].data;
      });

      return newData;
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      // If unauthorized, redirect to login
      if (error.response && error.response.status === 401) {
        AdminAuthService.logout();
        window.location.href = '/login';
      }
      return null;
    }
  }

  static async createItem(category, data) {
    try {
      const headers = AdminAuthService.getAuthHeaders();
      const response = await api.post(`/${category}`, data, { headers });
      toast.success("Item criado com sucesso!")
      return response.data;
    } catch (error) {
      console.error("Erro ao criar item:", error);
      if (error.response && error.response.status === 401) {
        AdminAuthService.logout();
        window.location.href = '/login';
      }
      toast.error("Não foi possivel criar item.")
      return null
    }
  }

  static async updateItem(category, id, data) {
    try {
      const headers = AdminAuthService.getAuthHeaders();
      const response = await api.put(`/${category}/${id}`, data, { headers });
      toast.success("Item atualizado com sucesso!")
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
      if (error.response && error.response.status === 401) {
        AdminAuthService.logout();
        window.location.href = '/login';
      }
      toast.error("Não foi possivel atualizar item.")
      return null;
    }
  }

  static async deleteItem(category, id) {
    try {
      const headers = AdminAuthService.getAuthHeaders();
      await api.delete(`/${category}/${id}`, { headers });
      toast.success("Item deletado com sucesso!")
    } catch (error) {
      console.error("Erro ao deletar item:", error);
      if (error.response && error.response.status === 401) {
        AdminAuthService.logout();
        window.location.href = '/login';
      }
      toast.error("Não foi possivel deletar item.")
    }
  }
}

export default AdminService; 
