import { Link } from "react-router-dom";
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404 - Página Não Encontrada</h1>
      <p>A página que você está procurando não existe ou foi movida.</p>
      <Link to="/" className="home-link">Voltar para a página inicial</Link>
    </div>
  );
};

export default NotFound;