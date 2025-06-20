import { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import Filter from '../../components/Filter/Filter';
import '../../pages/PaginasTematicas.css';
import Api from '../../services/Api';
import './Trilha.css';
import NoContentCard from '../../components/NoContentCard/NoContentCard.jsx';
import Map from '../../components/Map/Map';

const Trilhas = () => {
  const trailFilters = [
    { value: 'all', label: 'Todas' },
    { value: 'easy', label: 'Iniciantes' },
    { value: 'medium', label: 'Intermediárias' },
    { value: 'high', label: 'Avançadas' }
  ];

  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState("true");
  const [err, setErr] = useState(null);
  const [trilhas, setTrilhas] = useState([]);

  const fetchTrilhas = async () => {
    try {
      const response = await Api.get("/trilhas");
      if (response.data) setTrilhas(response.data);
    } catch (error) {
      console.error("Erro ao carregar trilhas:", error);
      setErr(true);
    } finally {
      setLoading(false);
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
    : trilhas.filter(item => item.dificuldade === activeFilter);

  //TODO: fazer card dedicado para o carregamento
  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="pagina-tematica trilhas-page">
      <div className="main-content">
        {err ? (
          <NoContentCard title="trilhas" />
        ) : (
          <>
            <section className="container destaque-section">
              <h2>Principais Trilhas</h2>
              <div className="filter-section">
                <Filter
                  filters={trailFilters}
                  onFilterChange={handleFilterChange}
                />
              </div>
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
          </>
        )}
        <section className="info-section">
          <h3>Dicas para Trilheiros</h3>
          <ul>
            <li>Leve água e snacks energéticos</li>
            <li>Use calçados adequados</li>
            <li>Verifique a previsão do tempo</li>
            <li>Respeite as trilhas sinalizadas</li>
          </ul>
        </section>
        <Map
          title="Explore Nossas Trilhas"
          trilhas
        />
      </div>
    </div>
  );
};

export default Trilhas;
