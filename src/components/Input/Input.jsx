import "./Input.css"

export function InputText({ label, className, placeholder, value, onChange, name }) {
  return (
    <>
      <label>
        {label}
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
      </label>
    </>
  );
}

export function InputNumber({ label, className, placeholder, value, onChange, name, min, max, step }) {
  return (
    <>
      <label>
        {label}
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
      </label>
    </>
  );
}

export function InputSelect({ label, className, value, onChange, name, options = [] }) {
  return (
    <>
      <label>
        {label}
        <form className="container-input">
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
        </form>
      </label>
    </>
  )
}

export function InputTextarea({ label, className, placeholder, value, onChange, name, rows }) {
  return (
    <>
      <label>
        {label}
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
      </label>
    </>
  );
}

export function InputCheckbox({ label, className, checked, onChange, name }) {
  return (
    <>
      <label className="container-input checkbox-group">
        {label}
        <input
          type="checkbox"
          name={name}
          className={className}
          checked={checked}
          onChange={onChange}
        />
      </label>
    </>
  );
}

export function InputDate({ label, className, value, onChange, name }) {
  return (
    <>
      <label>
        {label}
        <div className="container-input">
          <input
            type="date"
            name={name}
            className={className}
            value={value}
            onChange={onChange}
          />
        </div>
      </label>
    </>
  );
}

export function InputCPF({ label, className, placeholder, value, onChange }) {
  return (
    <>
      <label>
        {label}
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
      </label>
    </>
  );
}

export function InputSenha({ label, className, placeholder, value, onChange }) {
  return (
    <>
      <label>
        {label}
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
      </label>
    </>
  );
}
