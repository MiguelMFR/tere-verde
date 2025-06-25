import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home/Home";
import Trilhas from "../pages/Trilha/Trilha";
import Biodiversidade from "../pages/Biodiversidade/Biodiverdade";
import Cachoeiras from "../pages/Cachoeira/Cachoeira";
import Eventos from "../pages/Evento/Evento";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Adm from "../pages/Adm/Adm";
import Login from "../pages/Login/Login";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";

const AppRoutes = () => {
  const location = useLocation();
  const hideNavbarAndFooter = location.pathname === "/adm";

  return (
    <>
      {!hideNavbarAndFooter && <Navbar />}
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trilhas" element={<Trilhas />} />
        <Route path="/biodiversidade" element={<Biodiversidade />} />
        <Route path="/cachoeiras" element={<Cachoeiras />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adm" element={<Adm />} />
      </Routes>
      {!hideNavbarAndFooter &&  <Footer />}
    </>
  );
};

const RoutesConfig = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default RoutesConfig;

