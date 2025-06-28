import { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import FeatureSection from "../../components/FeatureSection/FeatureSection";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import Map from "../../components/Map/Map";
import Api from "../../services/Api";
import './Home.css';
import NoContentCard from "../../components/NoContentCard/NoContentCard";
import { Link, useNavigate } from "react-router-dom";
import { link } from "fontawesome";
import LoadingCard from "../../components/LoadingCard/LoadingCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [trilhas, setTrilhas] = useState([]);
  const [cachoeiras, setCachoeiras] = useState([]);
  const [bio, setBio] = useState([]);
  const [eventos, setEventos] = useState([]);

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const background = "https://img.oastatic.com/img2/54940395/834x417r/variant.jpg"
  const navigate = useNavigate();


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
    } finally {
      setLoading(false);
    }
  };

  const fetchBio = async () => {
    try {
      const response = await Api.get("/biodiversidade");
      if (response.data) setBio(response.data);
    } catch (err) {
      console.error("Erro ao carregar biodiversidades: ", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchEventos = async () => {
    try {
      const response = await Api.get("/eventos");
      if (response.data) setEventos(response.data);
    } catch (err) {
      console.error("Erro ao carregar eventos: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCachoeiras();
    fetchTrilhas();
    fetchBio();
    fetchEventos();
  }, []);

  const handleLink = (page) => {
    navigate(page);
  }

  const attractions = [
    {
      image: trilhas[0]?.imagem[0],
      title: trilhas[0]?.nome,
      description: trilhas[1]?.descricao,
      link: "/trilhas"
    },
    {
      image: cachoeiras[0]?.imagem[0],
      title: cachoeiras[0]?.nome,
      description: cachoeiras[0]?.descricao,
      link: "/cachoeiras"
    }
  ];

  const features = [
    {
      image: bio[0]?.imagem[0],
      title: "Biodiversidade Única",
      description: "Teresópolis abriga uma rica diversidade de flora e fauna em suas unidades de conservação.",
      link: "/biodiversidade"
    },
    {
      image: eventos[0]?.imagem[0],
      title: "Eventos",
      description:"Participe de nossos eventos da cidade para aproveitar com a família",
      reverse: true,
      link: "/eventos"
    }
  ]

  return (
    <div className="home-page">
      <HeroBanner
        title="Descubra as Belezas Naturais de Teresópolis"
        subtitle="Explore o Circuito Terê Verde e viva experiências inesquecíveis"
        backgroundImage={background}
        targetId="container-id"
      />
      {loading ? (
        <LoadingCard />
      ) : err ? (
        <NoContentCard title="atrações" subtext />
      ) : (
        <>
          <div className="main-content">
            <section id="container-id" className="attractions-section container">
              <h2>Principais Atrações</h2>
              <div className="attractions-grid">
                {attractions.map((attraction, index) => (
                  <Card key={index} onClick={() => handleLink(attraction.link)} {...attraction} />
                ))}
              </div>
            </section>
            {features.map((feature, i) => (
              <FeatureSection key={i} onClick={() => handleLink(feature.link)} {...feature} />
            ))}
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
