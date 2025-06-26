import React, { useState, useEffect, useCallback } from 'react';
import AdminHeader from '../../components/SysAdm/AdminHeader';
import AdminTabs from '../../components/SysAdm/AdminTabs/AdminTabs';
import AdminDialog from '../../components/SysAdm/AdminDialog';
import AdminFormFields from '../../components/SysAdm/AdminFormFields';
import AdminService from '../../components/SysAdm/AdminService';
import '../../pages/Adm/Adm.css';
import Card from '../../components/Card/Card';

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
  imagem: '',
  localizacao: '',
  data: '',
  local: '',
  especie: '',
  tipo: 'endêmica',
  statusConservacao: 'pouco preocupante',
  dataFim: '',
  preco: 0,
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
    if (editingId) {
      await AdminService.updateItem(currentCategory, editingId, formData);
    } else {
      await AdminService.createItem(currentCategory, formData);
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
    <div className="admin-container">
      <AdminHeader
        title="Painel de Administração"
        onAddClick={() => { resetForm(); setOpenDialog(true); }}
        currentCategory={categories[activeTab].label}
      />
      <AdminTabs activeTab={activeTab} onTabChange={handleTabChange} categories={categories} />
      <AdminDialog
        isOpen={openDialog}
        title={editingId ? `Editar ${categories[activeTab].label}` : `Adicionar ${categories[activeTab].label}`}
        onClose={() => setOpenDialog(false)}
        footer={
          <>
            <button className="btn" onClick={() => setOpenDialog(false)}>Cancelar</button>
            <button className="btn" onClick={handleSubmit}>{editingId ? 'Atualizar' : 'Salvar'}</button>
          </>
        }
      >
        <AdminFormFields
          category={categories[activeTab].name}
          formData={formData}
          onChange={handleInputChange}
        />
      </AdminDialog>
      <AdminDialog
        isOpen={openDeleteDialog}
        title="Confirmar Exclusão"
        onClose={() => setOpenDeleteDialog(false)}
        footer={
          <>
            <button className="btn" onClick={() => setOpenDeleteDialog(false)}>Cancelar</button>
            <button className="btn" onClick={handleDelete}>Confirmar</button>
          </>
        }
      >
        <p>Tem certeza que deseja excluir este item?</p>
      </AdminDialog>
      <div className="cards-container">
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
      </div>
    </div>
  );
};

export default SysAdm;
