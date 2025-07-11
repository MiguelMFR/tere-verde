import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from "../../assets/images/logo-tere-verde.png";
import { toogleTheme } from "../../utils/theme/toogleTheme.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");
  const location = useLocation();

  const getCurrentTheme = () => {
    return document.documentElement.getAttribute("data-bs-theme") || "light";
  }

  useEffect(() => {
    const updateTheme = () => {
      setCurrentTheme(getCurrentTheme());
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-bs-theme']
    });
    return () => observer.disconnect();
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Circuito Terê Verde" />
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
          <button
            className='theme-button desktop-theme'
            onClick={toogleTheme}
            aria-label="Alterar tema"
          >
            <FontAwesomeIcon
              className='switch-theme'
              icon={currentTheme === "dark" ? faSun : faMoon}
            />
          </button>
        </div>

        <div className="mobile-controls">
          <button
            className='theme-button mobile-theme'
            onClick={toogleTheme}
            aria-label="Alterar tema"
          >
            <FontAwesomeIcon
              className='switch-theme'
              icon={currentTheme === "dark" ? faSun : faMoon}
            />
          </button>

          <div className="mobile-menu" onClick={() => setIsOpen(!isOpen)}>
            <span className={`bar ${isOpen ? 'open' : ''}`}></span>
            <span className={`bar ${isOpen ? 'open' : ''}`}></span>
            <span className={`bar ${isOpen ? 'open' : ''}`}></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
