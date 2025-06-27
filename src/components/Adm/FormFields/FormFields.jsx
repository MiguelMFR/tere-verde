import { InputCheckbox, InputDate, InputNumber, InputSelect, InputText, InputTextarea } from '../../Input/Input';

const AdminFormFields = ({ category, formData, onChange }) => {
  const nameLabel = category === 'biodiversidade' ? 'Espécie' : 'Nome';
  const nameField = category === 'biodiversidade' ? 'especie' : 'nome';

  const dificuldadeOptions = [
    { value: "easy", label: "Fácil" },
    { value: "medium", label: "Média" },
    { value: "hard", label: "Difícil" }
  ];

  const tipoEventoOptions = [
    { value: "cultural", label: "Cultural" },
    { value: "esportivo", label: "Esportivo" },
    { value: "ecologico", label: "Ecológico" }
  ];

  const tipoBiodiversidadeOptions = [
    { value: "ave", label: "Ave" },
    { value: "flora", label: "Flora" },
    { value: "mamifero", label: "Mamífero" }
  ];

  const statusConservacaoOptions = [
    { value: "pouco preocupante", label: "Pouco preocupante" },
    { value: "vulnerável", label: "Vulnerável" },
    { value: "em perigo", label: "Em perigo" },
    { value: "critica", label: "Crítica" }
  ];


  return (
    <div className="form-fields">
      <InputText
        label={nameLabel}
        name={nameField}
        value={formData[nameField]}
        onChange={onChange}
      />

      {category === "trilhas" && (
        <>
          <InputSelect label="Dificuldade" name="dificuldade" value={formData.dificuldade} onChange={onChange} options={dificuldadeOptions} />
          <InputText label="Duração" name="duracao" value={formData.duracao} onChange={onChange} />
          <InputText label="Distância (km)" name="distancia" value={formData.distancia} onChange={onChange} />
          <InputText label="Altitude (m)" name="altitude" value={formData.altitude} onChange={onChange} />
        </>
      )}
      {category === 'cachoeiras' && (
        <>
          <InputText label="Localização" name="localizacao" value={formData.localizacao} onChange={onChange} />
          <InputSelect label="Dificuldade de Acesso" name="dificuldade" value={formData.dificuldade} onChange={onChange} options={dificuldadeOptions} />
          <InputText label="Altura da Queda (m)" name="altitude" value={formData.altitude} onChange={onChange} />
          <InputCheckbox label="Possui Piscina Natural" name="destaque" checked={formData.destaque} onChange={onChange} />
        </>
      )}

      {category === 'eventos' && (
        <>
          <InputDate label="Data Início" name="data" value={formData.data} onChange={onChange} />
          <InputDate label="Data Fim" name="dataFim" value={formData.dataFim} onChange={onChange} />
          <InputText label="Local" name="local" value={formData.local} onChange={onChange} />
          <InputNumber label="Preço" name="preco" value={formData.preco} onChange={onChange} min={0} step={0.01} />
          <InputSelect label="Tipo" name="tipo" value={formData.tipo} onChange={onChange} options={tipoEventoOptions} />
        </>
      )}

      {category === 'biodiversidade' && (
        <>
          <InputSelect label="Tipo" name="tipo" value={formData.tipo} onChange={onChange} options={tipoBiodiversidadeOptions} />
          <InputSelect label="Status de Conservação" name="statusConservacao" value={formData.statusConservacao} onChange={onChange} options={statusConservacaoOptions} />
          <InputText label="Habitat" name="localizacao" value={formData.localizacao} onChange={onChange} />
        </>
      )}

      <InputTextarea label="Descrição" name="descricao" value={formData.descricao} onChange={onChange} rows={2} />
      <InputText label="URL da Imagem" name="imagem" value={formData.imagem} onChange={onChange} />
      <InputCheckbox label="Destaque" name="destaque" checked={formData.destaque} onChange={onChange} />
    </div>
  );
};

export default AdminFormFields; 
