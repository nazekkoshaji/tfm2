import './Footer.css';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../context/translations';

export default function Footer() {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <footer className="footer" id="contacto">
            <div className="footer-container">
                <div className="footer-map">
                    <h4>{t.ubicacion}</h4>
                    <iframe
                        title="Ubicación Sushi Delight"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.3985222919846!2d-3.703790084604743!3d40.41677597936406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42288b75b76b79%3A0xf0e9f3c6b1f6e0fa!2sPuerta%20del%20Sol!5e0!3m2!1ses!2ses!4v1685711234567"
                        width="100%"
                        height="150"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                    <p>{t.direccion}</p>
                </div>

                <div className="footer-links">
                    <h4>{t.secciones}</h4>
                    <ul>
                        <li><a href="/">{t.home}</a></li>
                        <li><a href="/menu">{t.menu}</a></li>
                        <li><a href="/reservas">{t.reservas}</a></li>
                        <li><a href="/sobre">{t.sobreNosotros}</a></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h4>{t.contacto}</h4>
                    <p>Email: info@sushidelight.com</p>
                    <p>{t.telefono}</p>
                    <p>{t.horario}</p>
                </div>
            </div>
        </footer>
    );
}
