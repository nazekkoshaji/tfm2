import { useState, useEffect } from 'react';

export default function ReservationForm() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        time: '',
        people: 1
    });

    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Cargar reservas existentes
    useEffect(() => {
        fetch('http://localhost:4000/reservations')
            .then(res => res.json())
            .then(data => setReservations(data));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'people' ? parseInt(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const totalPeople = reservations.reduce((sum, r) => sum + r.people, 0);
        const newTotal = totalPeople + formData.people;

        if (newTotal > 15) {
            setError('¡No se puede exceder el aforo de 15 personas!');
            return;
        }

        const response = await fetch('http://localhost:4000/reservations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            setSuccess('Reserva realizada con éxito 🎉');
            setFormData({
                name: '',
                phone: '',
                date: '',
                time: '',
                people: 1
            });

            const updated = await fetch('http://localhost:4000/reservations').then(res => res.json());
            setReservations(updated);
        } else {
            setError('Error al realizar la reserva');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="reservation-form">
            <label>
                Nombre:
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>

            <label>
                Teléfono:
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </label>

            <label>
                Fecha:
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </label>

            <label>
                Hora:
                <input type="time" name="time" value={formData.time} onChange={handleChange} required />
            </label>

            <label>
                Nº de personas:
                <input type="number" name="people" min="1" max="15" value={formData.people} onChange={handleChange} required />
            </label>

            <button type="submit">Reservar</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
    );
}
