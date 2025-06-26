import { InputText } from '../Input/Input';

const AdminFormFields = ({ category, formData, onChange }) => {
  const nameLabel = category === 'biodiversidade' ? 'Espécie' : 'Nome';
  const nameField = category === 'biodiversidade' ? 'especie' : 'nome';

  return (
    <div className="form-fields">
      <InputText
        label={nameLabel}
        name={nameField}
        value={formData[nameField]}
        onChange={onChange}
      />
      {/* Add more fields here based on category, similar to Adm.jsx */}
      {/* ... */}
    </div>
  );
};

export default AdminFormFields; 
