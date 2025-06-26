import React, { useState, useEffect, useCallback } from "react";
import api from "../../services/Api";
import "./Adm.css";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState({
    trilhas: [],
    cachoeiras: [],
    eventos: [],
    biodiversidade: []
  });

  const [formData, setFormData] = useState({
    nome: "",
    dificuldade: "Média",
    duracao: "",
    descricao: "",
    imagem: "",
    localizacao: "",
    data: "",
    local: "",
    especie: "",
    tipo: "endêmica",
    statusConservacao: "pouco preocupante",
    dataFim: "",
    preco: 0,
    distancia: "",
    altitude: "",
    destaque: false
  });

  const [editingId, setEditingId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({ id: null, category: null });

  const categories = [
    { name: "trilhas", label: "Trilhas" },
    { name: "cachoeiras", label: "Cachoeiras" },
    { name: "eventos", label: "Eventos" },
    { name: "biodiversidade", label: "Biodiversidade" }
  ];

  const fetchAllData = useCallback(async () => {
    try {
      const responses = await Promise.all(
        categories.map(category => api.get(`/${category.name}`))
      );

      const newData = {};
      categories.forEach((category, index) => {
        newData[category.name] = responses[index].data;
      });

      setData(newData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const handleTabChange = (newValue) => setActiveTab(newValue);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = async () => {
    const currentCategory = categories[activeTab].name;
    try {
      if (editingId) {
        await api.put(`/${currentCategory}/${editingId}`, prepareFormData(currentCategory));
      } else {
        await api.post(`/${currentCategory}`, prepareFormData(currentCategory));
      }
      resetForm();
      fetchAllData();
      setOpenDialog(false);
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  const prepareFormData = (category) => {
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
          dificuldadeAcesso: formData.dificuldade,
          alturaQueda: formData.altitude,
          possuiPiscina: formData.destaque
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
          especie: formData.especie,
          tipo: formData.tipo,
          statusConservacao: formData.statusConservacao,
          habitat: formData.localizacao
        };
      default:
        return baseFields;
    }
  };

  const handleEdit = (item) => {
    const currentCategory = categories[activeTab].name;
    
    const baseFields = {
      nome: item.nome || item.especie,
      descricao: item.descricao,
      imagem: item.imagem,
      destaque: item.destaque || false
    };

    switch (currentCategory) {
      case 'trilhas':
        setFormData({
          ...baseFields,
          dificuldade: item.dificuldade,
          duracao: item.duracao,
          distancia: item.distancia,
          altitude: item.altitude
        });
        break;
      case 'cachoeiras':
        setFormData({
          ...baseFields,
          localizacao: item.localizacao,
          dificuldade: item.dificuldadeAcesso,
          altitude: item.alturaQueda,
          destaque: item.possuiPiscina
        });
        break;
      case 'eventos':
        setFormData({
          ...baseFields,
          data: item.data,
          dataFim: item.dataFim,
          local: item.local,
          preco: item.preco,
          tipo: item.tipo
        });
        break;
      case 'biodiversidade':
        setFormData({
          ...baseFields,
          especie: item.especie || item.nome,
          tipo: item.tipo,
          statusConservacao: item.statusConservacao,
          localizacao: item.habitat
        });
        break;
      default:
        setFormData(baseFields);
    }

    setEditingId(item.id);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/${itemToDelete.category}/${itemToDelete.id}`);
      fetchAllData();
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      dificuldade: "Média",
      duracao: "",
      descricao: "",
      imagem: "",
      localizacao: "",
      data: "",
      local: "",
      especie: "",
      tipo: "endêmica",
      statusConservacao: "pouco preocupante",
      dataFim: "",
      preco: 0,
      distancia: "",
      altitude: "",
      destaque: false
    });
    setEditingId(null);
  };

  const renderFormFields = () => {
    const currentCategory = categories[activeTab].name;
    
    const nameLabel = currentCategory === 'biodiversidade' ? "Espécie" : "Nome";
    const nameField = currentCategory === 'biodiversidade' ? "especie" : "nome";

    return (
      <div className="form-fields">
        <div className="form-group">
          <label>{nameLabel}</label>
          <input
            type="text"
            name={nameField}
            value={formData[nameField]}
            onChange={handleInputChange}
          />
        </div>

        {currentCategory === 'trilhas' && (
          <>
            <div className="form-group">
              <label>Dificuldade</label>
              <select
                name="dificuldade"
                value={formData.dificuldade}
                onChange={handleInputChange}
              >
                <option value="Fácil">Fácil</option>
                <option value="Média">Média</option>
                <option value="Difícil">Difícil</option>
              </select>
            </div>

            <div className="form-group">
              <label>Duração</label>
              <input
                type="text"
                name="duracao"
                value={formData.duracao}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Distância (km)</label>
              <input
                type="text"
                name="distancia"
                value={formData.distancia}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Altitude (m)</label>
              <input
                type="text"
                name="altitude"
                value={formData.altitude}
                onChange={handleInputChange}
              />
            </div>
          </>
        )}

        {currentCategory === 'cachoeiras' && (
          <>
            <div className="form-group">
              <label>Localização</label>
              <input
                type="text"
                name="localizacao"
                value={formData.localizacao}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Dificuldade de Acesso</label>
              <select
                name="dificuldade"
                value={formData.dificuldade}
                onChange={handleInputChange}
              >
                <option value="fácil">Fácil</option>
                <option value="média">Média</option>
                <option value="difícil">Difícil</option>
              </select>
            </div>

            <div className="form-group">
              <label>Altura da Queda (m)</label>
              <input
                type="text"
                name="altitude"
                value={formData.altitude}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                name="destaque"
                checked={formData.destaque}
                onChange={handleInputChange}
              />
              <label>Possui Piscina Natural</label>
            </div>
          </>
        )}

        {currentCategory === 'eventos' && (
          <>
            <div className="form-group">
              <label>Data Início</label>
              <input
                type="date"
                name="data"
                value={formData.data}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Data Fim</label>
              <input
                type="date"
                name="dataFim"
                value={formData.dataFim}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Local</label>
              <input
                type="text"
                name="local"
                value={formData.local}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Preço</label>
              <input
                type="number"
                name="preco"
                value={formData.preco}
                onChange={handleInputChange}
                min="0"
                step="0.01"
              />
            </div>

            <div className="form-group">
              <label>Tipo</label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleInputChange}
              >
                <option value="cultural">Cultural</option>
                <option value="esportivo">Esportivo</option>
                <option value="gastronômico">Gastronômico</option>
              </select>
            </div>
          </>
        )}

        {currentCategory === 'biodiversidade' && (
          <>
            <div className="form-group">
              <label>Tipo</label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleInputChange}
              >
                <option value="endêmica">Endêmica</option>
                <option value="felino">Felino</option>
                <option value="ave">Ave</option>
                <option value="flora">Flora</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status de Conservação</label>
              <select
                name="statusConservacao"
                value={formData.statusConservacao}
                onChange={handleInputChange}
              >
                <option value="pouco preocupante">Pouco preocupante</option>
                <option value="vulnerável">Vulnerável</option>
                <option value="em perigo">Em perigo</option>
                <option value="criticamente em perigo">Criticamente em perigo</option>
              </select>
            </div>

            <div className="form-group">
              <label>Habitat</label>
              <input
                type="text"
                name="localizacao"
                value={formData.localizacao}
                onChange={handleInputChange}
              />
            </div>
          </>
        )}

        <div className="form-group">
          <label>Descrição</label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleInputChange}
            rows="2"
          />
        </div>

        <div className="form-group">
          <label>URL da Imagem</label>
          <input
            type="text"
            name="imagem"
            value={formData.imagem}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            name="destaque"
            checked={formData.destaque}
            onChange={handleInputChange}
          />
          <label>Destaque</label>
        </div>
      </div>
    );
  };

  const renderCardContent = (item) => {
    const currentCategory = categories[activeTab].name;

    switch (currentCategory) {
      case 'trilhas':
        return (
          <>
            <h3 className="card-title">{item.nome}</h3>
            <div className="card-tags">
              <span className={`tag ${item.dificuldade?.toLowerCase()}`}>
                {item.dificuldade}
              </span>
              <span className="tag primary">{item.duracao}</span>
              {item.distancia && <span className="tag info">{item.distancia}</span>}
              {item.altitude && <span className="tag">{item.altitude}m</span>}
            </div>
            {item.descricao && <p className="card-description">{item.descricao}</p>}
            {item.destaque && <span className="tag highlight">Destaque</span>}
          </>
        );
      case 'cachoeiras':
        return (
          <>
            <h3 className="card-title">{item.nome}</h3>
            <div className="card-tags">
              <span className="tag info">{item.dificuldadeAcesso} acesso</span>
              {item.alturaQueda && <span className="tag">{item.alturaQueda}</span>}
              {item.possuiPiscina && <span className="tag success">Com piscina</span>}
            </div>
            {item.descricao && <p className="card-description">{item.descricao}</p>}
            {item.destaque && <span className="tag highlight">Destaque</span>}
          </>
        );
      case 'eventos':
        return (
          <>
            <h3 className="card-title">{item.nome}</h3>
            <div className="card-tags">
              <span className="tag">
                {new Date(item.data).toLocaleDateString('pt-BR')}
                {item.dataFim && ` - ${new Date(item.dataFim).toLocaleDateString('pt-BR')}`}
              </span>
              <span className="tag secondary">{item.local}</span>
              {item.preco > 0 ? (
                <span className="tag">R$ {item.preco.toFixed(2)}</span>
              ) : (
                <span className="tag success">Gratuito</span>
              )}
            </div>
            {item.descricao && <p className="card-description">{item.descricao}</p>}
            {item.destaque && <span className="tag highlight">Destaque</span>}
          </>
        );
      case 'biodiversidade':
        return (
          <>
            <h3 className="card-title">{item.especie || item.nome}</h3>
            <div className="card-tags">
              <span className="tag success">{item.tipo}</span>
              {item.statusConservacao && (
                <span className={`tag ${item.statusConservacao?.replace(" ", "-").toLowerCase()}`}>{item.statusConservacao}</span>
              )}
            </div>
            {item.descricao && <p className="card-description">{item.descricao}</p>}
            {item.destaque && <span className="tag highlight">Destaque</span>}
          </>
        );
      default:
        return (
          <>
            <h3 className="card-title">{item.nome || item.especie}</h3>
            {item.descricao && <p className="card-description">{item.descricao}</p>}
          </>
        );
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">Painel de Administração</h1>
        <button 
          className="btn"
          onClick={() => {
            resetForm();
            setOpenDialog(true);
          }}
        >
          Adicionar {categories[activeTab].label}
        </button>
      </div>

      <div className="tabs">
        {categories.map((category, index) => (
          <div 
            key={category.name}
            className={`tab ${activeTab === index ? 'active' : ''}`}
            onClick={() => handleTabChange(index)}
          >
            {category.label}
          </div>
        ))}
      </div>

      {openDialog && (
        <div className="dialog-overlay">
          <div className="dialog">
            <div className="dialog-header">
              <h2>
                {editingId ? `Editar ${categories[activeTab].label}` : `Adicionar ${categories[activeTab].label}`}
              </h2>
              <button 
                className="close-btn"
                onClick={() => setOpenDialog(false)}
              >
                &times;
              </button>
            </div>
            <div className="dialog-body">
              {renderFormFields()}
            </div>
            <div className="dialog-footer">
              <button 
                className="btn"
                onClick={() => setOpenDialog(false)}
              >
                Cancelar
              </button>
              <button 
                className="btn"
                onClick={handleSubmit}
              >
                {editingId ? "Atualizar" : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {openDeleteDialog && (
        <div className="dialog-overlay">
          <div className="dialog">
            <div className="dialog-header">
              <h2>Confirmar Exclusão</h2>
              <button 
                className="close-btn"
                onClick={() => setOpenDeleteDialog(false)}
              >
                &times;
              </button>
            </div>
            <div className="dialog-body">
              <p>Tem certeza que deseja excluir este item?</p>
            </div>
            <div className="dialog-footer">
              <button 
                className="btn"
                onClick={() => setOpenDeleteDialog(false)}
              >
                Cancelar
              </button>
              <button 
                className="btn"
                onClick={handleDelete}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="cards-container">
        {data[categories[activeTab].name]?.map((item) => (
          <div className="card" key={item.id}>
            {item.imagem && (
              <img 
                src={item.imagem} 
                alt={item.nome || item.especie} 
                className="card-image"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://via.placeholder.com/300x200?text=Imagem+indisponível";
                }}
              />
            )}
            <div className="card-content">
              {renderCardContent(item)}
            </div>
            <div className="card-actions">
              <button 
                className="btn"
                onClick={() => handleEdit(item)}
                aria-label="editar"
              >
                Editar
                <i className="fas fa-edit"></i>
              </button>
              <button 
                className="btn"
                onClick={() => {
                  setItemToDelete({ id: item.id, category: categories[activeTab].name });
                  setOpenDeleteDialog(true);
                }}
                aria-label="deletar"
              >
                Deletar
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;