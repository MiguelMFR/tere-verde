import { useState, useEffect, useCallback } from 'react';
import '../../pages/Adm/Adm.css';
import "../PaginasTematicas.css"
import AdminService from '../../components/Adm/AdminService';
import Header from '../../components/Adm/Header/Header';
import Tabs from '../../components/Adm/Tabs/Tabs';
import Dialog from '../../components/Adm/Dialog/Dialog';
import FormFields from '../../components/Adm/FormFields/FormFields';
import Card from '../../components/Card/Card';
import { prepareFormData } from '../../components/Adm/PrepareFormData';
import SubmitCard from '../../components/Adm/SubmitCard/SubmitCard';
import { validateFormData } from '../../components/Adm/ValidateFormData';
import NoContentCard from "../../components/NoContentCard/NoContentCard";

const categories = [
  { name: 'trilhas', label: 'Trilhas' },
  { name: 'cachoeiras', label: 'Cachoeiras' },
  { name: 'eventos', label: 'Eventos' },
  { name: 'biodiversidade', label: 'Biodiversidade' }
];

const initialFormData = {
  nome: '',
  descricao: '',

  dificuldade: 'Média',
  duracao: '',
  distancia: '',
  altitude: '',

  localizacao: '',
  dificuldadeAcesso: "Média",
  alturaQueda: "",
  possuiPiscina: false,

  data: '',
  dataFim: "",
  local: "",
  preco: 0,
  tipo: 'Cultural',

  especie: "",
  classificacao: "Ave",
  statusConservacao: 'pouco preocupante',
  habitat: '',

  imagem: [""],
  destaque: false,
};

const SysAdm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState({ trilhas: [], cachoeiras: [], eventos: [], biodiversidade: [] });
  const [formData, setFormData] = useState(initialFormData);
  const [editingId, setEditingId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({ id: null, category: null });
  const [apiConected, setApiConected] = useState(true);
  const [errors, setErrors] = useState({});

  const fetchAllData = useCallback(async () => {
    const result = await AdminService.fetchAllData(categories);
    if (result === null) {
      setApiConected(false);
    } else {
      setData(result)
      setApiConected(true)
    }
  }, []);

  useEffect(() => { fetchAllData(); }, [fetchAllData]);

  const handleTabChange = (newValue) => setActiveTab(newValue);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async () => {
    const currentCategory = categories[activeTab].name;
    console.log('FormData antes da validação:', formData); 
    const errors = validateFormData(currentCategory, formData);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    const dataToSend = prepareFormData(currentCategory, formData);

    if (editingId) {
      try {
        await AdminService.updateItem(currentCategory, editingId, dataToSend);
      } catch (err) {
      }
    } else {
      try {
        await AdminService.createItem(currentCategory, dataToSend);
      } catch (err) {
      }
    }
    resetForm();
    fetchAllData();
    setOpenDialog(false);
  };
  const handleEdit = async (item) => {
    setFormData({ ...initialFormData, ...item });
    setEditingId(item.id);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    await AdminService.deleteItem(itemToDelete.category, itemToDelete.id);
    fetchAllData();
    setOpenDeleteDialog(false);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingId(null);
  };

  return (
    <>
      <Header
        title="Painel de Administração"
        onAddClick={() => { resetForm(); setOpenDialog(true); }}
        currentCategory={categories[activeTab].label}
      />
      <section className="admin-container">
        <h1>Painel de Administração</h1>
        <Tabs activeTab={activeTab} onTabChange={handleTabChange} categories={categories} />
        <Dialog
          isOpen={openDialog}
          title={editingId ? `Editar ${categories[activeTab].label}` : `Adicionar ${categories[activeTab].label}`}
          onClose={() => setOpenDialog(false)}
          footer={
            <>
              <button className="btn btn-edit" onClick={() => setOpenDialog(false)}>Cancelar</button>
              <button className="btn" onClick={handleSubmit}>{editingId ? 'Atualizar' : 'Salvar'}</button>
            </>
          }
        >
          <FormFields
            category={categories[activeTab].name}
            formData={formData}
            setFormData={setFormData}
            onChange={handleInputChange}
            errors={errors}
          />
        </Dialog>
        <Dialog
          isOpen={openDeleteDialog}
          title="Confirmar Exclusão"
          onClose={() => setOpenDeleteDialog(false)}
          footer={
            <>
              <button className="btn btn-edit" onClick={() => setOpenDeleteDialog(false)}>Cancelar</button>
              <button className="btn btn-delete" onClick={handleDelete}>Confirmar</button>
            </>
          }
        >
          <p>Tem certeza que deseja excluir este item?</p>
        </Dialog>
        <section className="cards-grid">
          {!apiConected ? (
            <NoContentCard
              className="no-filtered-content no-conection"
              title="conexão com o servidor"
              subtext
            />
          ) : (
            <>
              <SubmitCard
                onClick={() => {
                  resetForm();
                  setOpenDialog(true);
                }}
                category={categories[activeTab].label}
              />
              {data[categories[activeTab].name]?.map(item => (
                <Card
                  key={item.id}
                  image={item.imagem[0]}
                  title={item.nome}
                  description={item.descricao}
                  item={item}
                  onEdit={handleEdit}
                  onDelete={() => {
                    setItemToDelete({ id: item.id, category: categories[activeTab].name });
                    setOpenDeleteDialog(true);
                  }}
                />
              ))}
            </>
          )}
        </section>
      </section>
    </>
  );
};

export default SysAdm;
