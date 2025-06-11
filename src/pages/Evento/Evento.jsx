import React, { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import './Evento.css';
import '../../pages/PaginasTematicas.css'
import Navbar from '../../components/Navbar/Navbar';
import Filter from '../../components/Filter/Filter';
import Footer from '../../components/Footer/Footer';
import Api from '../../services/Api';
import NoContentCard from "../../components/NoContentCard/"

const Eventos = () => {
  const eventFilters = [
    { value: 'all', label: 'Todos' },
    { value: 'cultural', label: 'Culturais' },
    { value: 'ecologico', label: 'Ecológicos' },
    { value: 'esportivo', label: 'Esportivos' }
  ];

  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [eventos, setEventos] = useState([]);

  const fetchEventos = async () => {
    try {
      const response = await Api.get("/eventos");
      if (response.data) setEventos(response.data);
    } catch (error) {
      console.error("Erro ao carregar eventos:", error);
      setErr("Erro ao carregar eventos. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const handleFilterChange = (filterValue) => {
    setActiveFilter(filterValue);
  };

  const filteredItems = activeFilter === 'all'
    ? eventos
    : eventos.filter(item => item.tipo === activeFilter);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="pagina-tematica eventos-page">
      <Navbar />

      <div className="main-content">
        {err != null ? (
          <NoContentCard title="eventos" />
        ) : (
          <>
            <div className="filter-section">
              <Filter
                filters={eventFilters}
                onFilterChange={handleFilterChange}
              />
            </div>

            <section className="container destaque-section">
              <h2>Próximos Eventos</h2>
              <div className="card-grid">
                {filteredItems.map((evento) => (
                  <Card
                    key={evento.id}
                    image={evento.imagem}
                    title={evento.nome}
                    description={evento.descricao}
                    link={`/eventos/${evento.id}`}
                  />
                ))}
              </div>
            </section>
          </>
        )}
        <section className="info-section">
          <h3>Como Participar</h3>
          <ul>
            <li>Eventos gratuitos: apenas chegar</li>
            <li>Eventos pagos: inscrição no site</li>
            <li>Leve documentos para credenciamento</li>
            <li>Chegue com 30min de antecedência</li>
          </ul>
        </section>

      </div>

      <Footer />
    </div>
  );
};

export default Eventos;
