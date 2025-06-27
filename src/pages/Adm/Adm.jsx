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
import { toast } from 'react-hot-toast';
import { validateFormData } from '../../components/Adm/ValidateFormData';

const categories = [
  { name: 'trilhas', label: 'Trilhas' },
  { name: 'cachoeiras', label: 'Cachoeiras' },
  { name: 'eventos', label: 'Eventos' },
  { name: 'biodiversidade', label: 'Biodiversidade' }
];

const initialFormData = {
  nome: '',
  dificuldade: 'Média',
  duracao: '',
  descricao: '',
  imagem: [""],
  localizacao: '',
  data: '',
  local: '',
  especie: '',
  tipo: 'ave',
  statusConservacao: 'pouco preocupante',
  dataFim: '',
  distancia: '',
  altitude: '',
  destaque: false
};

const SysAdm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState({ trilhas: [], cachoeiras: [], eventos: [], biodiversidade: [] });
  const [formData, setFormData] = useState(initialFormData);
  const [editingId, setEditingId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({ id: null, category: null });
  const [errors, setErrors] = useState({});

  const fetchAllData = useCallback(async () => {
    setData(await AdminService.fetchAllData(categories));
  }, []);

  useEffect(() => { fetchAllData(); }, [fetchAllData]);

  const handleTabChange = (newValue) => setActiveTab(newValue);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async () => {
    const currentCategory = categories[activeTab].name;
    const errors = validateFormData(currentCategory, formData);
    if (Object.keys(errors).length > 0){ 
      setErrors(errors);
      return;
    }

    const dataToSend = prepareFormData(currentCategory, formData);

    if (editingId) {
      try {
        await AdminService.updateItem(currentCategory, editingId, dataToSend);
        toast.success("Item adicionado com sucesso!")
      } catch (err) {
        toast.error("Erro ao criar item.")
      }
    } else {
      try {
        await AdminService.createItem(currentCategory, dataToSend);
        toast.success("Item adicionado com sucesso!")
      } catch (err) {
        toast.error("Erro ao criar item")
      }
    }
    resetForm();
    fetchAllData();
    setOpenDialog(false);
  };

  const handleEdit = async (item) => {
    try {
      setFormData({ ...initialFormData, ...item });
      setEditingId(item.id);
      setOpenDialog(true);
      toast.success("Item alterado com sucesso!")
    } catch (err) {
      toast.error("Não foi possivel editar item.")
    }
  };

  const handleDelete = async () => {
    try {
      await AdminService.deleteItem(itemToDelete.category, itemToDelete.id);
      fetchAllData();
      setOpenDeleteDialog(false);
      toast.success("Item deletado com successo!")
    } catch (err) {
      toast.error("Não foi possivel deletar item.")
    }
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
              categories={[
                { label: item.dificuldade, type: item.dificuldade },
              ]}
              item={item}
              onEdit={handleEdit}
              onDelete={() => {
                setItemToDelete({ id: item.id, category: categories[activeTab].name });
                setOpenDeleteDialog(true);
              }}
            />
          ))}
        </section>
      </section>
    </>
  );
};

export default SysAdm;
