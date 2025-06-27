export function validateFormData(category, formData) {
  const errors = {};

  if (!formData.nome) errors.nome = "Nome é obrigatório";
  if (!formData.descricao) errors.descricao = "Descrição é obrigatória";
  if (!formData.imagem || (Array.isArray(formData.imagem) ? !formData.imagem[0] : !formData.imagem)) {
    errors.imagem = "URL da imagem é obrigatória";
  }

  switch (category) {
    case 'trilhas':
      if (!formData.dificuldade) errors.dificuldade = "Dificuldade é obrigatória";
      if (!formData.duracao) errors.duracao = "Duração é obrigatória";
      if (!formData.distancia) errors.distancia = "Distância é obrigatória";
      if (!formData.altitude) errors.altitude = "Altitude é obrigatória";
      break;
    case 'cachoeiras':
      if (!formData.localizacao) errors.localizacao = "Localização é obrigatória";
      if (!formData.dificuldade) errors.dificuldade = "Dificuldade de acesso é obrigatória";
      if (!formData.altitude) errors.altitude = "Altura da queda é obrigatória";
      break;
    case 'eventos':
      if (!formData.data) errors.data = "Data início é obrigatória";
      if (!formData.local) errors.local = "Local é obrigatório";
      if (!formData.tipo) errors.tipo = "Tipo é obrigatório";
      break;
    case 'biodiversidade':
      if (!formData.especie) errors.especie = "Espécie é obrigatória";
      if (!formData.tipo) errors.tipo = "Tipo é obrigatório";
      if (!formData.statusConservacao) errors.statusConservacao = "Status de conservação é obrigatório";
      if (!formData.localizacao) errors.localizacao = "Habitat é obrigatório";
      break;
    default:
      break;
  }

  return errors;
}
