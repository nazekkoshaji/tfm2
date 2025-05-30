import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMenuItems } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import './Menu.css';

export default function Menu() {
    const [items, setItems] = useState([]);
    const { categoria } = useParams();

    const [selectedAllergens, setSelectedAllergens] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { language } = useLanguage();


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
        "Soja"
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

            <div className="filter-bar">
                <img
                    src="/filtrar.png"
                    alt="Filtrar"
                    className="filter-icon"
                    onClick={() => setIsModalOpen(true)}
                />
            </div>

            {/* Modal con checkboxes */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h2>Filtrar por alérgenos</h2>
                        <form>
                            {allAllergens.map((allergen) => (
                                <label key={allergen} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={selectedAllergens.includes(allergen)}
                                        onChange={() => handleCheckboxChange(allergen)}
                                    />
                                    Sin {allergen.toLowerCase()}
                                </label>
                            ))}
                            <button type="button" onClick={applyFilter}>Filtrar</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Carrusel de platos */}
            <div className="menu-carousel">
                {filteredItems.map(item => (
                    <div key={item.id} className="menu-card">
                        <img
                            src={item.image}
                            alt={item.name[language]}
                            className="menu-image"
                        />

                        <div className="menu-info">
                            <h3>{item.name[language]}</h3>
                            <p>{item.description[language]}</p>
                            <p><strong>{item.price.toFixed(2)} €</strong></p>

                            {item.allergens && item.allergens.length > 0 && (
                                <ul className="allergen-list">
                                    {item.allergens.map((allergen, index) => {
                                        const filename = normalizeAllergen(allergen);
                                        return (
                                            <li key={index}>
                                                <img
                                                    src={`/allergens/${filename}.png`}
                                                    alt={allergen}
                                                    className="allergen-icon"
                                                />
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
