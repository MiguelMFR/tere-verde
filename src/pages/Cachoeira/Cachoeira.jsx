import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Filter from "../../components/Filter/Filter";
import Map from "../../components/Map/Map";
import NoContentCard from "../../components/NoContentCard/NoContentCard.jsx";
import "../../pages/PaginasTematicas.css";
import Api from "../../services/Api";
import "./Cachoeira.css";
import Modal from "../../components/Modal/Modal.jsx";
import { getCategoryLabel } from "../../utils/functions/getCategoryLabel";
import LoadingCard from "../../components/LoadingCard/LoadingCard.jsx";

const Cachoeiras = () => {
  const waterfallFilters = [
    { value: "all", label: "Todas" },
    { value: "easy", label: "Acesso Fácil" },
    { value: "medium", label: "Caminhada Média" },
    { value: "hard", label: "Aventureiras" },
  ];

  const [cachoeiras, setCachoeiras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedCachoeira, setSelectedCachoeira] = useState(null);

  const activeFilterName = waterfallFilters.find(f => f.value === activeFilter)?.label?.toLocaleLowerCase();

  const fetchCachoeiras = async () => {
    try {
      const response = await Api.get("/cachoeiras");
      if (response.data) {
        setCachoeiras(response.data);
      }
    } catch (error) {
      console.error("Erro ao carregar cachoeiras:", error);
      setError("Erro ao carregar as cachoeiras. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCachoeiras();
  }, []);

  const handleFilterChange = (filterValue) => {
    setActiveFilter(filterValue);
  };

  const handleBoolean = (value) => {
    if (value) {
      return "sim";
    }
    return "não";
  }

  const filteredItems =
    activeFilter === "all"
      ? cachoeiras
      : cachoeiras.filter((item) => item.dificuldade === activeFilter);

  const handleDificuldadeLabel = () => {
    var dificuldade = getCategoryLabel("cachoeira", selectedCachoeira.dificuldade);
    return dificuldade?.toLocaleLowerCase();
  }

  return (
    <div className="pagina-tematica cachoeiras-page">
      <div className="main-content">
        {loading ? ( 
          <LoadingCard/>
        ) : err ? ( 
          <NoContentCard title="cachoeiras" subtext />
        ) : (
          <>
            <section className="container destaque-section">
              <h2>Melhores Cachoeiras</h2>
              <div className="filter-section">
                <Filter
                  filters={waterfallFilters}
                  onFilterChange={handleFilterChange}
                />
              </div>
              <div className="card-grid">
                {filteredItems.length === 0 && (
                  <NoContentCard className="no-filtered-content" title={`cachoeiras ${activeFilterName}`} />
                )}
                {filteredItems.map((cachoeira) => (
                  <Card
                    key={cachoeira.id}
                    page="trilha-cachoeira"
                    image={cachoeira.imagem[0]}
                    title={cachoeira.nome}
                    categories={[
                      { label: getCategoryLabel("cachoeira", cachoeira.dificuldadeAcesso), type: cachoeira.dificuldadeAcesso }
                    ]}
                    description={cachoeira.descricao}
                    onClick={() => setSelectedCachoeira(cachoeira)}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        <section className="info-section">
          <h3>Segurança em Cachoeiras</h3>
          <ul>
            <li>Não salte de locais altos</li>
            <li>Atente-se às correntezas</li>
            <li>Leve protetor solar à prova d'água</li>
            <li>Evite dias de chuva forte</li>
          </ul>
        </section>
        <Map
          title="Explore Nossas Cachoeiras"
          cachoeiras
        />
      </div>

      <Modal type={selectedCachoeira} isOpen={selectedCachoeira !== null} onClose={() => setSelectedCachoeira(null)}>
        {selectedCachoeira && [
          `Tipo: ${handleDificuldadeLabel()}`,
          `Segurança: ${selectedCachoeira.seguranca?.join(', ').toLocaleLowerCase()}`,
          `Altura da queda: ${selectedCachoeira.alturaQueda}`,
          `Possui piscina: ${handleBoolean(selectedCachoeira.possuiPiscina)}`
        ]}
      </Modal>
    </div>
  );
};

export default Cachoeiras;
