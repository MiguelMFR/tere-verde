import { InputCheckbox, InputDate, InputNumber, InputSelect, InputText, InputTextarea } from '../../Input/Input';

const AdminFormFields = ({ category, formData, onChange, errors}) => {
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
      {errors && errors[nameField] && <span className='error-message'>{errors[nameField]}</span>}
      {category === "trilhas" && (
        <>
          <InputSelect label="Dificuldade" name="dificuldade" value={formData.dificuldade} onChange={onChange} options={dificuldadeOptions} />
          {errors && errors.dificuldade && <span className='error-message'>{errors.dificuldade}</span>}

          <InputText label="Duração" name="duracao" value={formData.duracao} onChange={onChange} />
          {errors && errors.duracao && <span className='error-message'>{errors.duracao}</span>}

          <InputText label="Distância (km)" name="distancia" value={formData.distancia} onChange={onChange} />
          {errors && errors.distancia && <span className='error-message'>{errors.distancia}</span>}

          <InputText label="Altitude (m)" name="altitude" value={formData.altitude} onChange={onChange} />
          {errors && errors.altitude && <span className='error-message'>{errors.altitude}</span>}
        </>
      )}
      {category === 'cachoeiras' && (
        <>
          <InputText label="Localização" name="localizacao" value={formData.localizacao} onChange={onChange} />
          {errors && errors.localizacao && <span className='error-message'>{errors.localizacao}</span>}

          <InputSelect label="Dificuldade de Acesso" name="dificuldade" value={formData.dificuldade} onChange={onChange} options={dificuldadeOptions} />
          {errors && errors.dificuldade && <span className='error-message'>{errors.dificuldade}</span>}

          <InputText label="Altura da Queda (m)" name="altitude" value={formData.altitude} onChange={onChange} />
          {errors && errors.altitude && <span className='error-message'>{errors.altitude}</span>}

          <InputCheckbox label="Possui Piscina Natural" name="destaque" checked={formData.destaque} onChange={onChange} />
        </>
      )}

      {category === 'eventos' && (
        <>
          <InputDate label="Data Início" name="data" value={formData.data} onChange={onChange} />
          {errors && errors.data && <span className='error-message'>{errors.data}</span>}

          <InputDate label="Data Fim" name="dataFim" value={formData.dataFim} onChange={onChange} />
          {/* Usually not required, so no error */}

          <InputText label="Local" name="local" value={formData.local} onChange={onChange} />
          {errors && errors.local && <span className='error-message'>{errors.local}</span>}

          <InputNumber label="Preço" name="preco" value={formData.preco} onChange={onChange} min={0} step={0.01} />
          {/* Optional, so no error */}

          <InputSelect label="Tipo" name="tipo" value={formData.tipo} onChange={onChange} options={tipoEventoOptions} />
          {errors && errors.tipo && <span className='error-message'>{errors.tipo}</span>}
        </>
      )}

      {category === 'biodiversidade' && (
        <>
          <InputSelect label="Tipo" name="tipo" value={formData.tipo} onChange={onChange} options={tipoBiodiversidadeOptions} />
          {errors && errors.tipo && <span className='error-message'>{errors.tipo}</span>}

          <InputSelect label="Status de Conservação" name="statusConservacao" value={formData.statusConservacao} onChange={onChange} options={statusConservacaoOptions} />
          {errors && errors.statusConservacao && <span className='error-message'>{errors.statusConservacao}</span>}

          <InputText label="Habitat" name="localizacao" value={formData.localizacao} onChange={onChange} />
          {errors && errors.localizacao && <span className='error-message'>{errors.localizacao}</span>}
        </>
      )}

      <InputTextarea label="Descrição" name="descricao" value={formData.descricao} onChange={onChange} rows={2} />
      {errors && errors.descricao && <span className='error-message'>{errors.descricao}</span>}

      <InputText label="URL da Imagem" name="imagem" value={formData.imagem} onChange={onChange} />
      {errors && errors.imagem && <span className='error-message'>{errors.imagem}</span>}

      <InputCheckbox label="Destaque" name="destaque" checked={formData.destaque} onChange={onChange} />
    </div>
  );
};

export default AdminFormFields; 
