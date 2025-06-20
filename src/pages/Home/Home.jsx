import { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import FeatureSection from "../../components/FeatureSection/FeatureSection";
import Gallery from "../../components/Gallery/Gallery";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import Map from "../../components/Map/Map";
import Api from "../../services/Api";
import './Home.css';
import NoContentCard from "../../components/NoContentCard/NoContentCard";

const Home = () => {
  const [trilhas, setTrilhas] = useState([]);
  const [cachoeiras, setCachoeiras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const background = "https://img.oastatic.com/img2/54940395/834x417r/variant.jpg"

  const fetchTrilhas = async () => {
    try {
      const response = await Api.get("/trilhas");
      if (response.data) setTrilhas(response.data);
    } catch (error) {
      console.error("Erro ao carregar trilhas:", error);
      setErr("Erro ao carregar a pagina. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCachoeiras = async () => {
    try {
      const response = await Api.get("/cachoeiras");
      if (response.data) setCachoeiras(response.data);
    } catch (error) {
      console.error("Erro ao carregar cachoeiras:", error);
    }
  };

  useEffect(() => {
    fetchCachoeiras();
    fetchTrilhas();
  }, []);

  const attractions = [
    {
      image: trilhas[0]?.imagem,
      title: trilhas[0]?.nome,
      description: trilhas[0]?.descricao,
      link: `/trilhas/${trilhas[0]?.id}`
    },
    {
      image: cachoeiras[0]?.imagem,
      title: cachoeiras[0]?.nome,
      description: cachoeiras[0]?.descricao,
      link: `/cachoeiras/${cachoeiras[0]?.id}`
    }
  ];

  if (loading) {
    return <div>Carregando...</div>
  };
  return (
    <div className="home-page">
      <HeroBanner
        title="Descubra as Belezas Naturais de Teresópolis"
        subtitle="Explore o Circuito Terê Verde e viva experiências inesquecíveis"
        backgroundImage={background}
      />
      {err != null ? (
        <NoContentCard title="atrações" />
      ) : (
        <>
          <div className="main-content">
            <section className="attractions-section container">
              <h2>Principais Atrações</h2>
              <div className="attractions-grid">
                {attractions.map((attraction, index) => (
                  <Card key={index} {...attraction} />
                ))}
              </div>
            </section>

            {/*TODO:Fazer com que as requisicoes sejam feitas da API */}
            <FeatureSection
              title="Biodiversidade Única"
              description="Teresópolis abriga uma rica diversidade de flora e fauna em suas unidades de conservação."
              image="https://guiadostrilheiros.com.br/wp-content/webp-express/webp-images/uploads/2024/05/CACHOEIRA-DO-TIO-FRANCA-2.jpg.webp"
              reverse={false}
            />

            <FeatureSection
              title="Eventos de Ecoturismo"
              description="Participe de nossos eventos que promovem o contato consciente com a natureza."
              image="https://guiadostrilheiros.com.br/wp-content/webp-express/webp-images/uploads/2024/05/CACHOEIRA-DO-TIO-FRANCA-2.jpg.webp"
              reverse={true}
            />
          </div>
        </>
      )}
      <Map
        title="Explore Nossas Atrações"
        cachoeiras trilhas parques

      />

    </div>
  );
};

export default Home;
