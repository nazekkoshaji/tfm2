const BASE_URL = import.meta.env.VITE_API_URL || '';

export async function getMenuItems() {
    const res = await fetch(`${BASE_URL}/api/menu`);
    if (!res.ok) throw new Error('Error al cargar el menú');
    return await res.json();
}

export async function sendReservation(data) {
    const res = await fetch(`${BASE_URL}/api/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al enviar la reserva');
    return await res.json();
}
