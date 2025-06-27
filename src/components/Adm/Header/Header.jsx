import './Header.css';
import logo from "../../../assets/images/logo-tere-verde.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { toogleTheme } from '../../../utils/theme/toogleTheme';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const AdminHeader = ({ title }) => {
  const [currentTheme, setCurrentTheme] = useState("light");

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

  return (
    <div className="admin-header">
      <div className="admin-header-container">
        <img src={logo} alt="Circuito Terê Verde" />
        <button
          className='theme-button'
          onClick={toogleTheme}
          aria-label="Alterar tema"
        >
          <FontAwesomeIcon
            className='switch-theme'
            icon={currentTheme === "dark" ? faSun : faMoon}
          />
        </button>
      </div>
    </div>
  )
};

export default AdminHeader; 
