import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>Sobre o Terê Verde</h3>
          <p>Promovendo o ecoturismo consciente em Teresópolis.</p>
        </div>

        <div className="footer-section links">
          <h3>Links Rápidos</h3>
          <ul>
            <li><a href="/">Início</a></li>
            <li><a href="/trilhas">Trilhas</a></li>
            <li><a href="/cachoeiras">Cachoeiras</a></li>
            <li><a href="/biodiversidade">Biodiversidade</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contato</h3>
          <p>contato@tereverde.com</p>
          <p>(21) 99999-9999</p>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Circuito Terê Verde | Todos os direitos reservados
      </div>
    </footer>
  );
};

export default Footer;
