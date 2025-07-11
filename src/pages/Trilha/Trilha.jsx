import { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import Filter from '../../components/Filter/Filter';
import '../../pages/PaginasTematicas.css';
import Api from '../../services/Api';
import './Trilha.css';
import NoContentCard from '../../components/NoContentCard/NoContentCard.jsx';
import Modal from '../../components/Modal/Modal.jsx';
import Map from '../../components/Map/Map';
import { getCategoryLabel } from '../../utils/functions/getCategoryLabel';
import LoadingCard from '../../components/LoadingCard/LoadingCard.jsx';


const Trilhas = () => {
  const trailFilters = [
    { value: 'all', label: 'Todas' },
    { value: 'easy', label: 'Iniciantes' },
    { value: 'medium', label: 'Intermediárias' },
    { value: 'hard', label: 'Avançadas' }
  ];

  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [trilhas, setTrilhas] = useState([]);
  const [selectedTrilha, setSelectedTrilha] = useState(null);

  const activeFilterName = trailFilters.find(f => f.value === activeFilter)?.label.toLocaleLowerCase();

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

  const handleDificuldadeLabel = () => {
    var dificuldade = getCategoryLabel("trilha", selectedTrilha.dificuldade);
    return dificuldade.toLocaleLowerCase();
  }

  return (
    <div className="pagina-tematica trilhas-page">
      <div className="main-content">
        {loading ? ( 
          <LoadingCard/>
        ) : err ? ( 
          <NoContentCard title="trilhas" subtext />
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
                {filteredItems.length === 0 && (
                  <NoContentCard className="no-filtered-content" title={`trilhas ${activeFilterName}`} />
                )}
                {filteredItems.map((trilha) => (
                  <Card
                    key={trilha.id}
                    page="trilha-cachoeira"
                    image={trilha.imagem[0]}
                    title={trilha.nome}
                    categories={[
                      { label: getCategoryLabel("trilha", trilha.dificuldade), type: trilha.dificuldade },
                      { label: trilha.duracao, type: trilha.duracao }
                    ]}
                    description={trilha.descricao}
                    onClick={() => setSelectedTrilha(trilha)}
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

      <Modal type={selectedTrilha} isOpen={selectedTrilha !== null} onClose={() => setSelectedTrilha(null)}>
        {selectedTrilha && [
          `Dificuldade: ${handleDificuldadeLabel()}`,
          `Duração: ${selectedTrilha.duracao}`,
          `Distância: ${selectedTrilha.distancia}`,
          `Altitude: ${selectedTrilha.altitude}`
        ]}
      </Modal>
    </div>
  );
};

export default Trilhas;
