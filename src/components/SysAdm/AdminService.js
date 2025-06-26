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
      throw error;
    }
  }

  static async createItem(category, data) {
    try {
      const response = await api.post(`/${category}`, data);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar item:", error);
      throw error;
    }
  }

  static async updateItem(category, id, data) {
    try {
      const response = await api.put(`/${category}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
      throw error;
    }
  }

  static async deleteItem(category, id) {
    try {
      await api.delete(`/${category}/${id}`);
    } catch (error) {
      console.error("Erro ao deletar item:", error);
      throw error;
    }
  }
}

export default AdminService; 