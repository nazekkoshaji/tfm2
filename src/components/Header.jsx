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
                <h1>SUSHI BAR</h1>


                {/* Navegación con traducción */}
                <nav>
                    <ul className="nav-list">
                        <li><Link to="/">{t.home}</Link></li>
                        <li className="dropdown">
                            <Link to="/menu">{t.menu}</Link>
                            <ul className="dropdown-content">
                                <li><Link to="/menu/platos">{t.platos}</Link></li>
                                <li><Link to="/menu/bebidas">{t.bebidas}</Link></li>
                                <li><Link to="/menu/postres">{t.postres}</Link></li>
                            </ul>
                        </li>
                        <li><Link to="/reservas">{t.reservas}</Link></li>
                        <li><Link to="/sobre">{t.sobreNosotros}</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
