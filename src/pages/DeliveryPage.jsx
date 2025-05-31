import { useLanguage } from '../context/LanguageContext';
import { translations } from '../context/translations';
import './DeliveryPage.css';

export default function DeliveryPage() {
    const { language } = useLanguage();
    const t = translations[language].delivery;

    return (
        <div className="delivery-page">
            <div className="delivery-background"></div>
            <div className="delivery-content">
                <h2>{t.title}</h2>
                <p>{t.description}</p>
                <div className="delivery-options">
                    <a href="https://www.ubereats.com/" target="_blank" rel="noopener noreferrer" className="delivery-button">
                        {t.uber}
                    </a>
                    <a href="https://glovoapp.com/" target="_blank" rel="noopener noreferrer" className="delivery-button">
                        {t.glovo}
                    </a>
                    <a href="https://www.just-eat.com/" target="_blank" rel="noopener noreferrer" className="delivery-button">
                        {t.justEat}
                    </a>
                </div>
            </div>
        </div>
    );
}
