import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../context/translations';
import './ReservationForm.css';

export default function ReservationForm() {
    const { language } = useLanguage();
    const t = translations[language].reservation;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        people: 1,
    });
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetch('http://localhost:4000/reservations')
            .then((res) => res.json())
            .then((data) => setReservations(data))
            .catch((err) => console.error('Error fetching reservations:', err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'people' ? parseInt(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://localhost:4000/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccess(t.success);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    date: '',
                    time: '',
                    people: 1,
                });
                const updated = await fetch('http://localhost:4000/reservations').then((res) => res.json());
                setReservations(updated);
            } else {
                setError(t.error);
            }
        } catch (error) {
            console.error('Error al enviar la reserva:', error);
            setError(t.error);
        }
    };

    const timeOptions = [];
    for (let hour = 20; hour <= 23; hour++) {
        const formatted = hour.toString().padStart(2, '0') + ':00';
        timeOptions.push(formatted);
    }
    timeOptions.push('00:00');

    return (
        <div className="reservation-page">
            <div className="reservation-content">
                <form onSubmit={handleSubmit} className="reservation-form">
                    <h2>{t.title}</h2>

                    <label htmlFor="name">{t.name}</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t.name}
                        required
                    />

                    <label htmlFor="email">{t.email}</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t.email}
                        required
                    />

                    <label htmlFor="phone">{t.phone}</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t.phone}
                        required
                    />

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="date">{t.date}</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="time">{t.time}</label>
                            <select
                                id="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                required
                            >
                                <option value="">{t.selectTime}</option>
                                {timeOptions.map((hour) => (
                                    <option key={hour} value={hour}>{hour}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="people">{t.people}</label>
                            <input
                                type="number"
                                id="people"
                                name="people"
                                min="1"
                                max="15"
                                value={formData.people}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit">{t.button}</button>

                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                </form>
            </div>
        </div>
    );
}
