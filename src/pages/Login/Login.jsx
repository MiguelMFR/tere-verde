import { useState } from "react";
import { InputCPF, InputSenha } from "../../components/Input/Input";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import "./Login.css"
import logo from "../../assets/images/logo-tere-verde.png"

const Login = () => {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const handleCpfChange = (e) => {
    const cpfFormatado = cpfValidator.format(e.target.value);
    setCpf(cpfFormatado);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormErrors({});

    if (!cpfValidator.isValid(cpf)) {
      setFormErrors({ cpf: "O CPF é inválido" });
      return;
    }

    if (!senha.trim()) {
      setFormErrors({ senha: "A senha é obrigatória" });
      return;
    }

    console.log("Logando como:", {
      cpf: cpf,
      senha: senha
    });

    // TODO: Adicionar a chamada pra API
    // ex.:
    // loginUser({ cpf: cleanCpfData, senha: senha });
  };

  return (
    <>
      <div className="login-wrapper">
        <div className="logo">
          <img src={logo} alt="Circuito Terê Verde" />
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <InputCPF
            className="input"
            label="CPF:"
            placeholder="Digite o seu CPF"
            value={cpf}
            onChange={handleCpfChange}
          />
          {formErrors.cpf && <span className="error-message">{formErrors.cpf}</span>}

          <InputSenha
            className="input"
            label="Senha:"
            placeholder="Digite a sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          {formErrors.senha && <span className="error-message">{formErrors.senha}</span>}

          <p>Problemas ao logar?</p>
          <button type="submit" className="btn btn-submit">
            Entrar
          </button>
        </form>
        {/*TODO:Adicionar modal para encaminhar <p>*/}
      </div>
    </>
  )
}

export default Login;
