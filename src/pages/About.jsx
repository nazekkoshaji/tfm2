import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../context/translations';
import './About.css';

export default function About() {
    const [activeTab, setActiveTab] = useState('chef');
    const { language } = useLanguage();
    const t = translations[language].about;

    const { title, text, image } = t.content[activeTab];

    return (
        <div className="about">
            <div className="container-buttons">
                <button onClick={() => setActiveTab('chef')} className={activeTab === 'chef' ? 'active' : ''}>
                    {t.tabs.chef}
                </button>
                <button onClick={() => setActiveTab('historia')} className={activeTab === 'historia' ? 'active' : ''}>
                    {t.tabs.historia}
                </button>
                <button onClick={() => setActiveTab('valores')} className={activeTab === 'valores' ? 'active' : ''}>
                    {t.tabs.valores}
                </button>
            </div>
            <div className="table">
                <div className="table-image">
                    <img src={image} alt={title} />
                </div>
                <div className="table-text">
                    <h2>{title}</h2>
                    <p>{text}</p>
                </div>
            </div>
        </div>
    );
}
