import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../context/translations';
import './ReservationForm.css';

export default function ReservationForm() {
    const { language } = useLanguage();
    const t = translations[language].reservation;

    const API_URL = 'https://6856b8e31789e182b37ee2fa.mockapi.io/reservations';

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

    const allHours = ['20:00', '21:00', '22:00', '23:00', '00:00'];

    useEffect(() => {
        fetch(API_URL)
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

        const filtered = reservations.filter(r => r.date === formData.date && r.time === formData.time);
        const totalPeople = filtered.reduce((sum, r) => sum + Number(r.people), 0);
        const requested = Number(formData.people);

        if (totalPeople + requested > 10) {
            setError(t.timeFull);
            return;
        }

        try {
            const response = await fetch(API_URL, {
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
                const updated = await fetch(API_URL).then((res) => res.json());
                setReservations(updated);
            } else {
                setError(t.error);
            }
        } catch (error) {
            console.error('Error al enviar la reserva:', error);
            setError(t.error);
        }
    };

    const timeOptions = allHours.map((hour) => {
        const filtered = reservations.filter(r => r.date === formData.date && r.time === hour);
        const total = filtered.reduce((sum, r) => sum + Number(r.people), 0);
        const remaining = 10 - total;
        const disabled = total + formData.people > 10;
        return (
            <option key={hour} value={hour} disabled={disabled}>
                {disabled ? `${hour} - ${t.full}` : `${hour} (${remaining} ${t.spotsLeft})`}
            </option>
        );
    });

    return (
        <div className="reservation-page">
            <div className="reservation-content">
                <form onSubmit={handleSubmit} className="reservation-form" lang="es">
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
                        <div className="form-group custom-date-wrapper">
                            <label htmlFor="date">{t.date}</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                min="2025-06-22"
                                className="custom-date-input"
                            />
                            <span className="icon">📅</span>
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
                                {timeOptions}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="people">{t.people}</label>
                            <input
                                type="number"
                                id="people"
                                name="people"
                                min="1"
                                max="10"
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
