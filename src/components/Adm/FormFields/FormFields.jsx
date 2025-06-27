import { InputCheckbox, InputDate, InputNumber, InputSelect, InputText, InputTextarea } from '../../Input/Input';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AdminFormFields = ({ category, formData, onChange, errors, setFormData }) => {
  const nameValue = category === "biodiversidade" ? "nome" : "nome";
  const nameLabel = category === 'biodiversidade' ? 'Espécie' : 'Nome';

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

  const handleImageChange = (idx, e) => {
    const newImages = [...formData.imagem];
    newImages[idx] = e.target.value;
    setFormData(prev => ({ ...prev, imagem: newImages }));
  };

  const handleAddImage = () => {
    setFormData(prev => ({ ...prev, imagem: [...prev.imagem, ''] }));
  };

  const handleRemoveImage = (idx) => {
    setFormData(prev => ({
      ...prev,
      imagem: prev.imagem.filter((_, i) => i !== idx)
    }));
  };

  return (
    <div className="form-fields">
      <InputText
        label={nameLabel}
        name={nameValue}
        value={formData[nameValue] || ''}
        onChange={onChange}
      />
      {errors && errors[nameValue] && <span className='error-message'>{errors[nameValue]}</span>}
      {category === "trilhas" && (
        <>
          <InputSelect label="Dificuldade" name="dificuldade" value={formData.dificuldade || ''} onChange={onChange} options={dificuldadeOptions} />
          {errors && errors.dificuldade && <span className='error-message'>{errors.dificuldade}</span>}

          <InputText label="Duração" name="duracao" value={formData.duracao || ''} onChange={onChange} />
          {errors && errors.duracao && <span className='error-message'>{errors.duracao}</span>}

          <InputText label="Distância (km)" name="distancia" value={formData.distancia || ''} onChange={onChange} />
          {errors && errors.distancia && <span className='error-message'>{errors.distancia}</span>}

          <InputText label="Altitude (m)" name="altitude" value={formData.altitude || ''} onChange={onChange} />
          {errors && errors.altitude && <span className='error-message'>{errors.altitude}</span>}
        </>
      )}
      {category === 'cachoeiras' && (
        <>
          <InputText label="Localização" name="localizacao" value={formData.localizacao || ''} onChange={onChange} />
          {errors && errors.localizacao && <span className='error-message'>{errors.localizacao}</span>}

          <InputSelect label="Dificuldade de Acesso" name="dificuldadeAcesso" value={formData.dificuldadeAcesso || ''} onChange={onChange} options={dificuldadeOptions} />
          {errors && errors.dificuldadeAcesso && <span className='error-message'>{errors.dificuldadeAcesso}</span>}

          <InputText label="Altura da Queda (m)" name="alturaQueda" value={formData.alturaQueda || ''} onChange={onChange} />
          {errors && errors.alturaQueda && <span className='error-message'>{errors.alturaQueda}</span>}

          <InputCheckbox label="Possui Piscina Natural" name="possuiPiscina" checked={!!formData.possuiPiscina} onChange={onChange} />
        </>
      )}
      {category === 'eventos' && (
        <>
          <InputDate label="Data Início" name="data" value={formData.data || ''} onChange={onChange} />
          {errors && errors.data && <span className='error-message'>{errors.data}</span>}

          <InputDate label="Data Fim" name="dataFim" value={formData.dataFim || ''} onChange={onChange} />

          <InputText label="Local" name="local" value={formData.local || ''} onChange={onChange} />
          {errors && errors.local && <span className='error-message'>{errors.local}</span>}

          <InputNumber label="Preço" name="preco" value={formData.preco || 0} onChange={onChange} min={0} step={0.01} />

          <InputSelect label="Tipo" name="tipo" value={formData.tipo || ''} onChange={onChange} options={tipoEventoOptions} />
          {errors && errors.tipo && <span className='error-message'>{errors.tipo}</span>}
        </>
      )}
      {category === 'biodiversidade' && (
        <>
          <InputSelect label="Tipo" name="tipo" value={formData.tipo || ''} onChange={onChange} options={tipoBiodiversidadeOptions} />
          {errors && errors.tipo && <span className='error-message'>{errors.tipo}</span>}

          <InputSelect label="Status de Conservação" name="statusConservacao" value={formData.statusConservacao || ''} onChange={onChange} options={statusConservacaoOptions} />
          {errors && errors.statusConservacao && <span className='error-message'>{errors.statusConservacao}</span>}

          <InputText label="Habitat" name="habitat" value={formData.habitat || ''} onChange={onChange} />
          {errors && errors.habitat && <span className='error-message'>{errors.habitat}</span>}
        </>
      )}
      <InputTextarea label="Descrição" name="descricao" value={formData.descricao || ''} onChange={onChange} rows={2} />
      {errors && errors.descricao && <span className='error-message'>{errors.descricao}</span>}

      <label>
        URLs das Imagens
        {formData.imagem.map((img, idx) => (
          <div key={idx} className="form-img">
            {img && (
              <img
                src={img}
                alt={`preview-${idx}`}
                className="img-preview"
              />
            )}
            <InputText
              label={null}
              name={`imagem-${idx}`}
              value={img || ''}
              onChange={e => handleImageChange(idx, e)}
              placeholder="URL da imagem"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(idx)}
              className="btn-remove-img"
              aria-label="Remover imagem"
              disabled={formData.imagem.length === 1}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </label>
      <button
        type="button"
        onClick={handleAddImage}
        className="btn-add-img"
        aria-label="Adicionar imagem"
      >
        <FontAwesomeIcon icon={faPlus} /> Adicionar imagem
      </button>
      {errors && errors.imagem && <span className='error-message'>{errors.imagem}</span>}

      <InputCheckbox label="Destaque" name="destaque" checked={!!formData.destaque} onChange={onChange} />
    </div>
  );
};

export default AdminFormFields; 
