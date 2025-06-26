import "./Input.css"

export function InputText({ label, className, placeholder, value, onChange, name }) {
  return (
    <div className="container-input">
      <label>{label}</label>
      <input
        type="text"
        name={name}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export function InputCPF({ label, className, placeholder, value, onChange }) {
  return (
    <div className="container-input">
      <label>{label}</label>
      <input
        type="text"
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={14}
      />
    </div>
  );
}

export function InputSenha({ label, className, placeholder, value, onChange }) {
  return (
    <div className="container-input">
      <label>{label}</label>
      <input
        type="password"
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={20}
      />
    </div>
  );
}
