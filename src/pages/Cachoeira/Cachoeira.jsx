import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Filter from "../../components/Filter/Filter";
import Map from "../../components/Map/Map";
import NoContentCard from "../../components/NoContentCard/NoContentCard.jsx";
import "../../pages/PaginasTematicas.css";
import Api from "../../services/Api";
import "./Cachoeira.css";

const Cachoeiras = () => {
  const waterfallFilters = [
    { value: "all", label: "Todas" },
    { value: "fácil", label: "Acesso Fácil" },
    { value: "médio", label: "Caminhada Média" },
    { value: "difícil", label: "Aventureiras" },
  ];

  const [cachoeiras, setCachoeiras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const activeFilterName = waterfallFilters.find(f => f.value === activeFilter)?.label.toLocaleLowerCase();

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

  const filteredItems =
    activeFilter === "all"
      ? cachoeiras
      : cachoeiras.filter((item) => item.dificuldadeAcesso === activeFilter);

  //TODO: add card dedicado
  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="pagina-tematica cachoeiras-page">
      <div className="main-content">
        {error != null ? (
          <NoContentCard title="cachoeiras" />
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
                    image={cachoeira.imagem}
                    title={cachoeira.nome}
                    description={cachoeira.descricao}
                    link={`/cachoeiras/${cachoeira.id}`}
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
      </div>

      <Map title="Explore Nossas Cachoeiras" location={cachoeiras[0]} cachoeiras />
    </div>
  );
};

export default Cachoeiras;
