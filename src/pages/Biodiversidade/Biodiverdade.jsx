import React, { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import Filter from '../../components/Filter/Filter';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './Biodiversidade.css';
import '../../pages/PaginasTematicas.css'
import Api from '../../services/Api';

const Biodiversidade = () => {
  const bioFilters = [
    { value: 'all', label: 'Todas' },
    { value: 'ave', label: 'Aves' },
    { value: 'flora', label: 'Flora' },
    { value: 'mamiferos', label: 'Mamíferos' }
  ];

  const [activeFilter, setActiveFilter] = useState('all');

  const [biodiversidade, setBiodiversidade] = useState([]);

  const fetchBiodiversidades = async () => {
    try {
      const response = await Api.get("/biodiversidade");
      if (response.data) setBiodiversidade(response.data);
    } catch (error) {
      console.error("Erro ao carregar biodiversidades:", error);
    }
  };

  useEffect(() => {
    fetchBiodiversidades();
  }, []);

  const handleFilterChange = (filterValue) => {
    setActiveFilter(filterValue);
  };

  const filteredItems = activeFilter === 'all' 
    ? biodiversidade 
    : biodiversidade.filter(item => item.tipo === activeFilter);

  return (
    <div className="pagina-tematica biodiversidade-page">
    <Navbar/>

    <div className="main-content">
      <div className="filter-section">
        <Filter 
          filters={bioFilters} 
          onFilterChange={handleFilterChange}
        />
      </div>

      <section className="container destaque-section">
        <h2>Espécies Destaque</h2>
        <div className="card-grid">
          {filteredItems.map((biodiversidade) => (
              <Card 
                key={biodiversidade.id}
                image={biodiversidade.imagem}
                title={biodiversidade.nome}
                description={biodiversidade.descricao}
                link={`/biodiversidades/${biodiversidade.id}`}
              />
          ))}
        </div>
      </section>

      <section className="info-section">
        <h3>Conservação Ambiental</h3>
        <ul>
          <li>Não alimente animais silvestres</li>
          <li>Não colete plantas ou flores</li>
          <li>Respeite as áreas de preservação</li>
          <li>Denuncie caça ou extração ilegal</li>
        </ul>
      </section>
    </div>

    <Footer/>
  </div>
  );
};

export default Biodiversidade;