import express from 'express';
import { readAllCustomer, writeCustomer, readCustomer, deleteAllCustomer, updatecustomer, deleteCustomer } from './backend/manager.js';

const app = express();
const port = 3000;

//------------------------------------------customer------------------------------------------
app.get('/api/allcustomer', (req, res) => {
    try {
        const data = readAllCustomer();
        res.status(200).send(data); 
    } catch (error) {
        res.status(500).send('Fehler beim Lesen der Kundeninformationen');
    }
});

app.get('/api/customer/:id', (req, res) => {
    const customerID = req.params.id
    try {
        const data = readCustomer(customerID);
        res.status(200).send(data); 
    } catch (error) {
        res.status(500).send('Diesen Kunden gibt es nicht');
    }
});

app.use(express.json()) 

app.post('/api/newcustomer', (req, res) => {
    const {
        firstName,
        lastName,
        birthDate,
        address,
        gender,
        bankDetails,
        subscription,
        trainerID,
        customerCardID,
        appointments
    } = req.body;

    try {
        writeCustomer(firstName, lastName, birthDate, address, gender, bankDetails, subscription, trainerID, customerCardID, appointments);
        res.status(201).send({ message: 'Kunde erfolgreich erstellt' });
    } catch (error) {
        console.error("Fehler beim Erstellen des Kunden:", error);
        res.status(500).send({ error: 'Fehler beim Erstellen des Kunden' });
    }
});

app.put('/api/updatecustomer/:id', (req, res) => {
    const customerID = req.params.id
    const {
        firstName,
        lastName,
        birthDate,
        address,
        gender,
        bankDetails,
        subscription,
        trainerID,
        customerCardID,
        appointments
    } = req.body;

    try {
        updatecustomer(customerID, firstName, lastName, birthDate, address, gender, bankDetails, subscription, trainerID, customerCardID, appointments);
        res.status(200).send({ message: 'Kunde erfolgreich bearbeitet' });
    } catch (error) {
        console.error("Fehler beim bearbeiten des Kunden:", error);
        res.status(500).send({ error: 'Fehler beim bearbeiten des Kunden' });
    }
})

app.delete('/api/deletecustomer/:id', (req, res) => {
    const customerID = req.params.id

    try {
        deleteCustomer(customerID)
        res.status(201).send({ message: 'Kunden erfolgreich gelöscht' });
    } catch (error) {
        console.error("Fehler beim löschen der Kunden:", error);
        res.status(500).send({ error: 'Fehler beim löschen der Kunden' });
    }
})

app.delete('/api/deleteallcustomer', (req, res) => {
    try {
        deleteAllCustomer()
        res.status(201).send({ message: 'Kunden erfolgreich gelöscht' });
    } catch (error) {
        console.error("Fehler beim löschen der Kunden:", error);
        res.status(500).send({ error: 'Fehler beim löschen der Kunden' });
    }
})

//------------------------------------------trainer------------------------------------------



app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
