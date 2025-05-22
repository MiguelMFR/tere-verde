import React, { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import Filter from '../../components/Filter/Filter';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './Trilha.css';
import '../../pages/PaginasTematicas.css';
import Api from '../../services/Api';

const Trilhas = () => {
  const trailFilters = [
    { value: 'all', label: 'Todas' },
    { value: 'easy', label: 'Iniciantes' },
    { value: 'medium', label: 'Intermediárias' },
    { value: 'hard', label: 'Avançadas' }
  ];

  const [activeFilter, setActiveFilter] = useState('all');

  const [trilhas, setTrilhas] = useState([]);

  const fetchTrilhas = async () => {
    try {
      const response = await Api.get("/trilhas");
      if (response.data) setTrilhas(response.data);
    } catch (error) {
      console.error("Erro ao carregar trilhas:", error);
    }
  };

  useEffect(() => {
    fetchTrilhas();
  }, []);


  const handleFilterChange = (filterValue) => {
    setActiveFilter(filterValue);
  };

  const filteredItems = activeFilter === 'all' 
    ? trilhas 
    : trilhas.filter(item => item.difficulty === activeFilter);

  return (
    <div className="pagina-tematica trilhas-page">
      <Navbar />

      <div className="main-content">

      <div className="filter-section">
        <Filter
          filters={trailFilters}
          onFilterChange={handleFilterChange}
        />
      </div>

      <section className="container destaque-section">
        <h2>Principais Trilhas</h2>
        <div className="card-grid">
            {filteredItems.map((trilha) => (
              <Card 
                key={trilha.id}
                image={trilha.imagem}
                title={trilha.nome}
                description={trilha.descricao}
                link={`/trilhas/${trilha.id}`}
              />
            ))}
        </div>
      </section>

      <section className="info-section">
        <h3>Dicas para Trilheiros</h3>
        <ul>
          <li>Leve água e snacks energéticos</li>
          <li>Use calçados adequados</li>
          <li>Verifique a previsão do tempo</li>
          <li>Respeite as trilhas sinalizadas</li>
        </ul>
      </section>

      </div>

      <Footer />
    </div>
  );
};

export default Trilhas;