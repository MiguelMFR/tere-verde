import { toast } from 'react-hot-toast';
import api from '../../services/Api';

class AdminService {
  static async fetchAllData(categories) {
    try {
      const responses = await Promise.all(
        categories.map(category => api.get(`/${category.name}`))
      );

      const newData = {};
      categories.forEach((category, index) => {
        newData[category.name] = responses[index].data;
      });

      return newData;
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      return null;
    }
  }

  static async createItem(category, data) {
    try {
      const response = await api.post(`/${category}`, data);
      toast.success("Item criado com sucesso!")
      return response.data;
    } catch (error) {
      console.error("Erro ao criar item:", error);
      toast.error("Não foi possivel criar item.")
      return null
    }
  }

  static async updateItem(category, id, data) {
    try {
      const response = await api.put(`/${category}/${id}`, data);
      toast.success("Item atualizado com sucesso!")
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
      toast.error("Não foi possivel atualizar item.")
      return null;
    }
  }

  static async deleteItem(category, id) {
    try {
      await api.delete(`/${category}/${id}`);
      toast.success("Item deletado com sucesso!")
    } catch (error) {
      console.error("Erro ao deletar item:", error);
      toast.error("Não foi possivel deletar item.")
    }
  }
}

export default AdminService; 
