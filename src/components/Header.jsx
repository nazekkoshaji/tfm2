import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../context/translations';

function Header() {
    const location = useLocation();
    const isHome = location.pathname === '/';

    const { language, toggleLanguage } = useLanguage();
    const t = translations[language];

    return (
        <header className={isHome ? 'header-transparent' : 'header-colored'}>
            <div className="header-content">
                <button onClick={toggleLanguage} className="lang-button">
                    {language === 'es' ? 'EN' : 'ES'}
                </button>
                <h1>SUSHI WAHEED</h1>


                {/* Navegación con traducción */}
                <nav>
                    <ul className="nav-list">
                        <li><Link to="/">{t.home}</Link></li>
                        <li><Link to="/menu">{t.menu}</Link></li>
                        <li><Link to="/reservas">{t.reservas}</Link></li>
                        <li><Link to="/sobre">{t.sobreNosotros}</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
