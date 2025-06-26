import "./Input.css"

export function InputText({ label, className, placeholder, value, onChange, name }) {
  return (
    <>
      <label>{label}</label>
      <div className="container-input">
        <input
          type="text"
          name={name}
          className={className}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
}

export function InputNumber({ label, className, placeholder, value, onChange, name, min, max, step }) {
  return (
    <>
      <label>{label}</label>
      <div className="container-input">
        <input
          type="number"
          name={name}
          className={className}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
        />
      </div>
    </>
  );
}

export function InputSelect({ label, className, value, onChange, name, options = [] }) {
  return (
    <>
      <label>{label}</label>
      <div className="container-input">
        <span className="focus"></span>
        <select
          name={name}
          className={className}
          value={value}
          onChange={onChange}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </>
  )
}

export function InputTextarea({ label, className, placeholder, value, onChange, name, rows }) {
  return (
    <>
      <label>{label}</label>
      <div className="container-input">
        <textarea
          name={name}
          className={className}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows || 3}
        />
      </div>
    </>
  );
}

export function InputCheckbox({ label, className, checked, onChange, name }) {
  return (
    <>
      <div className="container-input checkbox-group">
        <input
          type="checkbox"
          name={name}
          className={className}
          checked={checked}
          onChange={onChange}
        />
        <label>{label}</label>
      </div>
    </>
  );
}

export function InputDate({ label, className, value, onChange, name }) {
  return (
    <>
      <label>{label}</label>
      <div className="container-input">
        <input
          type="date"
          name={name}
          className={className}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
}

export function InputCPF({ label, className, placeholder, value, onChange }) {
  return (
    <>
      <label>{label}</label>
      <div className="container-input">
        <input
          type="text"
          className={className}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          maxLength={14}
        />
      </div>
    </>
  );
}

export function InputSenha({ label, className, placeholder, value, onChange }) {
  return (
    <>
      <label>{label}</label>
      <div className="container-input">
        <input
          type="password"
          className={className}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          maxLength={20}
        />
      </div>
    </>
  );
}
