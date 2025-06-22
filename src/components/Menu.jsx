import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMenuItems } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import './Menu.css';
import { translations } from '../context/translations';

export default function Menu() {
    const [items, setItems] = useState([]);
    const { categoria } = useParams();
    const [selectedAllergens, setSelectedAllergens] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { language } = useLanguage();

    const t = translations[language];

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    useEffect(() => {
        getMenuItems().then(data => {
            const filtered = data.filter(item => {
                if (categoria === "platos") return item.tipo === "plato";
                if (categoria === "bebidas") return item.tipo === "bebida";
                if (categoria === "postres") return item.tipo === "postre";
                return false;
            });
            setItems(filtered);
        });
    }, [categoria]);

    const normalizeAllergen = (name) =>
        name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const allAllergens = [
        "Gluten",
        "Pescado",
        "Moluscos",
        "Lácteos",
        "Soja",
        "Crustaceos"
    ];

    const handleCheckboxChange = (allergen) => {
        setSelectedAllergens((prev) =>
            prev.includes(allergen)
                ? prev.filter((a) => a !== allergen)
                : [...prev, allergen]
        );
    };

    const applyFilter = () => {
        setIsModalOpen(false);
    };

    const filteredItems = selectedAllergens.length === 0
        ? items
        : items.filter(item =>
            !item.allergens?.some(a => selectedAllergens.includes(a))
        );

    return (
        <div className="menu-container">
            <h2 aria-label={`${t.menu} ${t[categoria]}`}>
                {t.menu} <span aria-hidden="true">{'>'}</span> {t[categoria]}
            </h2>

            <div className="filter-bar">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="filter-icon-button"
                    aria-label="Abrir filtros"
                >
                    <img
                        src="/filtrar.png"
                        alt=""
                        aria-hidden="true"
                        className="filter-icon"
                    />
                </button>
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="close-button"
                            onClick={() => setIsModalOpen(false)}
                            aria-label={language === 'es' ? "Cerrar modal" : "Close modal"}
                        >
                            &times;
                        </button>

                        <h2>{t.filterModal.title}</h2>
                        <form>
                            {allAllergens.map((allergen) => {
                                const filename = normalizeAllergen(allergen);
                                return (
                                    <label key={allergen} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={selectedAllergens.includes(allergen)}
                                            onChange={() => handleCheckboxChange(allergen)}
                                        />
                                        <img
                                            src={`/allergens/${filename}.png`}
                                            alt=""
                                            aria-hidden="true"
                                            className="allergen-icon"
                                            style={{ width: '20px', height: '20px', marginRight: '8px' }}
                                        />
                                        {t.filterModal.without} {allergen.toLowerCase()}
                                    </label>
                                );
                            })}
                            <button type="button" onClick={applyFilter}>
                                {t.filterModal.button}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="menu-carousel" role="list">
                {filteredItems.map(item => (
                    <div
                        key={item.id}
                        className="menu-card"
                        role="listitem"
                        tabIndex="0"
                        aria-label={`${item.name[language]}, ${item.price.toFixed(2)} euros`}
                    >
                        <img
                            src={item.image}
                            alt=""
                            aria-hidden="true"
                            className="menu-image"
                        />
                        <div className="menu-info">
                            <h3>{item.name[language]}</h3>
                            <p>{item.description[language]}</p>
                            <p><strong>{item.price.toFixed(2)} €</strong></p>
                            {item.allergens && item.allergens.length > 0 && (
                                <ul className="allergen-list" role="list">
                                    {item.allergens.map((allergen, index) => {
                                        const filename = normalizeAllergen(allergen);
                                        return (
                                            <li key={index} role="listitem">
                                                <img
                                                    src={`/allergens/${filename}.png`}
                                                    alt=""
                                                    aria-hidden="true"
                                                    className="allergen-icon"
                                                />
                                                <span className="sr-only">{allergen}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
