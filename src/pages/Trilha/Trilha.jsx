import {useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import Filter from '../../components/Filter/Filter';
import '../../pages/PaginasTematicas.css';
import Api from '../../services/Api';
import './Trilha.css';
import NoContentCard from '../../components/NoContentCard/NoContentCard.jsx';
import Modal from '../../components/Modal/Modal.jsx';

const Trilhas = () => {
  const trailFilters = [
    { value: 'all', label: 'Todas' },
    { value: 'easy', label: 'Iniciantes' },
    { value: 'medium', label: 'Intermediárias' },
    { value: 'hard', label: 'Avançadas' }
  ];

  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState("true");
  const [err, setErr] = useState(null);
  const [trilhas, setTrilhas] = useState([]);
  const [selectedTrilha, setSelectedTrilha] = useState(null);

  const fetchTrilhas = async () => {
    try {
      const response = await Api.get("/trilhas");
      if (response.data) setTrilhas(response.data);
    } catch (error) {
      console.error("Erro ao carregar trilhas:", error);
      setErr("Erro ao carregar as trilhas. Tente novamente mais tarde.");
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
    : trilhas.filter(item => item.difficulty === activeFilter);

  //TODO: fazer card dedicado para o carregamento
  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="pagina-tematica trilhas-page">
      <div className="main-content">
        {err != null ? (
          <NoContentCard title="trilhas" />
        ) : (
          <>
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
        {/*TODO:Adicionar Mapa*/}
      </div>

      <Modal type={selectedTrilha} isOpen={selectedTrilha !== null} onClose={() => setSelectedTrilha(null)}>
        {selectedTrilha && (
          <div>
            <p><strong>Descrição:</strong> {selectedTrilha.descricao}</p>
            <p><strong>Dificuldade:</strong> {selectedTrilha.dificuldade}</p>
            <p><strong>Duração:</strong> {selectedTrilha.duracao}</p>
            <p><strong>Distância:</strong> {selectedTrilha.distancia}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Trilhas;
