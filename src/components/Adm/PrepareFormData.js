export function prepareFormData(category, formData) {
  const baseFields = {
    nome: formData.nome,
    descricao: formData.descricao,
    imagem: formData.imagem,
    destaque: formData.destaque
  };

  switch (category) {
    case 'trilhas':
      return {
        ...baseFields,
        dificuldade: formData.dificuldade,
        duracao: formData.duracao,
        distancia: formData.distancia,
        altitude: formData.altitude
      };
    case 'cachoeiras':
      return {
        ...baseFields,
        localizacao: formData.localizacao,
        dificuldadeAcesso: formData.dificuldadeAcesso,
        alturaQueda: formData.alturaQueda,
        possuiPiscina: formData.possuiPiscina
      };
    case 'eventos':
      return {
        ...baseFields,
        data: formData.data,
        dataFim: formData.dataFim,
        local: formData.local,
        preco: parseFloat(formData.preco),
        tipo: formData.tipo
      };
    case 'biodiversidade':
      return {
        ...baseFields,
        classificacao: formData.classificacao,
        statusConservacao: formData.statusConservacao,
        habitat: formData.habitat
      };
    default:
      return baseFields;
  }
}
