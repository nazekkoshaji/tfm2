import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../context/translations';
import './MenuPage.css';

export default function MenuPage() {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <div className="menu-page">
            <h2>{t.menu}</h2>
            <div className="menu-buttons">
                <Link to="/menu/platos" className="menu-button">Platos</Link>
                <Link to="/menu/bebidas" className="menu-button">Bebidas</Link>
                <Link to="/menu/postres" className="menu-button">Postres</Link>
            </div>
        </div>
    );
}
