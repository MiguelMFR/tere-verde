import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavbarStyles.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Verifica se a rota atual corresponde ao link
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="https://guiadostrilheiros.com.br/wp-content/webp-express/webp-images/uploads/2024/05/CACHOEIRA-DO-TIO-FRANCA-2.jpg.webp" alt="Circuito Terê Verde" />
        </Link>
        
        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`nav-item ${isActive('/') ? 'active' : ''}`}
          >
            Início
          </Link>
          <Link 
            to="/trilhas" 
            className={`nav-item ${isActive('/trilhas') ? 'active' : ''}`}
          >
            Trilhas
          </Link>
          <Link 
            to="/cachoeiras" 
            className={`nav-item ${isActive('/cachoeiras') ? 'active' : ''}`}
          >
            Cachoeiras
          </Link>
          <Link 
            to="/biodiversidade" 
            className={`nav-item ${isActive('/biodiversidade') ? 'active' : ''}`}
          >
            Biodiversidade
          </Link>
          <Link 
            to="/eventos" 
            className={`nav-item ${isActive('/eventos') ? 'active' : ''}`}
          >
            Eventos
          </Link>
        </div>
        
        <div className="mobile-menu" onClick={() => setIsOpen(!isOpen)}>
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;