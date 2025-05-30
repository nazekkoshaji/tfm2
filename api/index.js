const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const dbFile = path.join(__dirname, '../public/db.json');

app.use(express.json());

// GET menú
app.get('/api/menu', (req, res) => {
    fs.readFile(dbFile, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error al leer db.json');
        const jsonData = JSON.parse(data);
        res.json(jsonData.menuItems);
    });
});

// GET reservas
app.get('/api/reservations', (req, res) => {
    fs.readFile(dbFile, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error al leer db.json');
        const jsonData = JSON.parse(data);
        res.json(jsonData.reservations || []);
    });
});

// POST nueva reserva
app.post('/api/reservations', (req, res) => {
    fs.readFile(dbFile, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error al leer db.json');
        const jsonData = JSON.parse(data);
        const newReservation = req.body;

        newReservation.id = Date.now().toString(); // ID único
        jsonData.reservations = jsonData.reservations || [];
        jsonData.reservations.push(newReservation);

        fs.writeFile(dbFile, JSON.stringify(jsonData, null, 2), err => {
            if (err) return res.status(500).send('Error al guardar db.json');
            res.status(201).json(newReservation);
        });
    });
});

module.exports = app;
