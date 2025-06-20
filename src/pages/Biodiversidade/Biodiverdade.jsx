import { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import Filter from '../../components/Filter/Filter';
import './Biodiversidade.css';
import '../../pages/PaginasTematicas.css'
import Api from '../../services/Api';
import NoContentCard from "../../components/NoContentCard/NoContentCard.jsx"

const Biodiversidade = () => {
  const bioFilters = [
    { value: 'all', label: 'Todas' },
    { value: 'ave', label: 'Aves' },
    { value: 'flora', label: 'Flora' },
    { value: 'mamiferos', label: 'Mamíferos' }
  ];

  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [biodiversidade, setBiodiversidade] = useState([]);

  const fetchBiodiversidades = async () => {
    try {
      const response = await Api.get("/biodiversidade");
      if (response.data) setBiodiversidade(response.data);
    } catch (error) {
      console.error("Erro ao carregar biodiversidades:", error);
      setErr("Erro ao carregar biodiversidade. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
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

  if (loading) {
    return <div>Carregando...</div>
  }

  return (
    <div className="pagina-tematica biodiversidade-page">
      <div className="main-content">
        {err != null ? (
          <NoContentCard title="biodiversidade" />
        ) : (
          <>

            <section className="container destaque-section">
              <h2>Espécies Destaque</h2>
              <div className="filter-section">
                <Filter
                  filters={bioFilters}
                  onFilterChange={handleFilterChange}
                />
              </div>
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
          </>
        )}
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
    </div>
  );
};

export default Biodiversidade;
