import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../context/translations';
import { useState } from 'react';

function Header() {
    const location = useLocation();
    const isHome = location.pathname === '/';

    const { language, toggleLanguage } = useLanguage();
    const t = translations[language];

    const [menuOpen, setMenuOpen] = useState(false);

    const handleLinkClick = () => {
        setMenuOpen(false); // Cierra el menú tras hacer clic
    };

    return (
        <header className={isHome ? 'header-transparent' : 'header-colored'}>
            <div className="header-content">
                <button
                    onClick={toggleLanguage}
                    className="lang-button"
                    aria-label={language === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'}
                >
                    {language === 'es' ? '🇬🇧' : '🇪🇸'}
                </button>


                <h1>SUSHI BAR</h1>

                <button
                    className="hamburger"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Abrir menú"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>

                <nav className={`nav-list-container ${menuOpen ? 'open' : ''}`}>
                    <ul className="nav-list">
                        <li><Link to="/" onClick={handleLinkClick}>{t.home}</Link></li>
                        <li className="dropdown">
                            <Link to="/menu" onClick={handleLinkClick}>{t.menu}</Link>
                            <ul className="dropdown-content">
                                <li><Link to="/menu/platos" onClick={handleLinkClick}>{t.platos}</Link></li>
                                <li><Link to="/menu/bebidas" onClick={handleLinkClick}>{t.bebidas}</Link></li>
                                <li><Link to="/menu/postres" onClick={handleLinkClick}>{t.postres}</Link></li>
                            </ul>
                        </li>
                        <li><Link to="/reservas" onClick={handleLinkClick}>{t.reservas}</Link></li>
                        <li><Link to="/sobre" onClick={handleLinkClick}>{t.sobreNosotros}</Link></li>
                        <li><Link to="/domicilio" onClick={handleLinkClick}>{t.domicilio}</Link></li>
                        <li><a href="/#contacto" onClick={handleLinkClick}>{t.contacto}</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
