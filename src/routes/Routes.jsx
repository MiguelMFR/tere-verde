import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Trilhas from "../pages/Trilha/Trilha";
import Biodiversidade from "../pages/Biodiversidade/Biodiverdade";
import Cachoeiras from "../pages/Cachoeira/Cachoeira";
import Eventos from "../pages/Evento/Evento";

const RoutesConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trilhas" element={<Trilhas />} />
        <Route path="/biodiversidade" element={<Biodiversidade />} />
        <Route path="/cachoeiras" element={<Cachoeiras />} />
        <Route path="/eventos" element={<Eventos />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesConfig;