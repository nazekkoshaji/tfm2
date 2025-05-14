const BASE_URL = 'http://localhost:4000'; // usa el puerto que hayas elegido

export async function getMenuItems() {
    const res = await fetch(`${BASE_URL}/menuItems`);
    return await res.json();
}

export async function sendReservation(data) {
    const res = await fetch(`${BASE_URL}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return await res.json();
}
