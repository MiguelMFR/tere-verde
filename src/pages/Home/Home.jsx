import { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import FeatureSection from "../../components/FeatureSection/FeatureSection";
import Footer from "../../components/Footer/Footer";
import Gallery from "../../components/Gallery/Gallery";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import Map from "../../components/Map/Map";
import Navbar from "../../components/Navbar/Navbar";
import Api from "../../services/Api";
import './Home.css';

const Home = () => {
  const [trilhas, setTrilhas] = useState([]);
  const [cachoeiras, setCachoeiras] = useState([]);

  const fetchTrilhas = async () => {
    try {
      const response = await Api.get("/trilhas");
      if (response.data) setTrilhas(response.data);
    } catch (error) {
      console.error("Erro ao carregar trilhas:", error);
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

  return (
    <div className="home-page">
      <Navbar />
      
      <HeroBanner 
        title="Descubra as Belezas Naturais de Teresópolis" 
        subtitle="Explore o Circuito Terê Verde e viva experiências inesquecíveis" 
        backgroundImage="https://i.pinimg.com/736x/a1/07/eb/a107ebb02304e5a34ddee93f1362c622.jpg"
      />
      
      <main>
        <section className="attractions-section container">
          <h2>Principais Atrações</h2>
          <div className="attractions-grid">
            {attractions.map((attraction, index) => (
              <Card key={index} {...attraction} />
            ))}
          </div>
        </section>
        
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
      </main>

      <Map />
      
      <Footer />
    </div>
  );
};

export default Home;