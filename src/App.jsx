
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import Menu from './components/Menu';
import About from './pages/About';
import ReservationPage from './pages/ReservationPage';
import Header from './components/Header';
import Footer from './components/Footer';
import Domicilio from './pages/Domicilio';

import './App.css';


function App() {
    const location = useLocation();
    const isHome = location.pathname === "/";

    return (
        <div className={`app ${isHome ? 'home-background' : ''}`}>
            <Header />

            {isHome && (
                <video autoPlay muted loop playsInline className="video-background">
                    <source src="/fondo.mp4" type="video/mp4" />
                    Tu navegador no soporta vídeo HTML5.
                </video>
            )}

            <main className={isHome ? "main-home" : "main-default"}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/menu/:categoria" element={<Menu />} />
                    <Route path="/reservas" element={<ReservationPage />} />
                    <Route path="/sobre" element={<About />} />
                    <Route path="/domicilio" element={<Domicilio />} />


                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default App;
