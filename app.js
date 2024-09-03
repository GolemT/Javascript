import express from 'express';
import { readAllCustomer, writeCustomer, readCustomer, deleteAllCustomer, updatecustomer, deleteCustomer, aboManager, writeTrainer, readAllTrainer, readTrainer, updateTrainer, deleteTrainer, deleteAllTrainer } from './backend/manager.js';

const app = express();
const port = 3000;


app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});

app.use(express.json()) 

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


app.post('/api/newcustomer', (req, res) => {
    const {
        firstName,
        lastName,
        birthDate,
        address,
        telefon,
        eMail,
        gender,
        bankDetails,
        subscription,
        subscriptionStart,
        trainerID,
        customerCardID,
        appointments
    } = req.body;

    try {
        writeCustomer(firstName, lastName, birthDate, address, telefon, eMail, gender, bankDetails, subscription, subscriptionStart, trainerID, customerCardID, appointments);
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
        telefon,
        eMail,
        gender,
        bankDetails,
        trainerID,
        appointments
    } = req.body;

    try {
        updatecustomer(customerID, firstName, lastName, birthDate, address, telefon, eMail, gender, bankDetails, trainerID, appointments);
        res.status(200).send({ message: 'Kunde erfolgreich bearbeitet' });
    } catch (error) {
        console.error("Fehler beim bearbeiten des Kunden:", error);
        res.status(500).send({ error: 'Fehler beim bearbeiten des Kunden' });
    }
})

app.put('/api/abo/:id', (req, res) => {
    const customerID = req.params.id
    const {
        subscription,
        subscriptionStart
    } = req.body;

    try {
        aboManager(customerID, subscription, subscriptionStart);
        res.status(200).send({ message: 'Abo erfolgreich bearbeitet' });
    } catch (error) {
        console.error("Fehler beim bearbeiten des Abos:", error);
        res.status(500).send({ error: 'Fehler beim bearbeiten des Abos' });
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


app.get('/api/alltrainer', (req, res) => {
    try {
        const data = readAllTrainer();
        console.log(data)
        res.status(200).send(data); 
    } catch (error) {
        res.status(500).send('Fehler beim Lesen der Trainerdaten');
    }
});

app.get('/api/trainer/:id', (req, res) => {
    const trainerID = req.params.id
    try {
        const data = readTrainer(trainerID);
        res.status(200).send(data); 
    } catch (error) {
        res.status(500).send('Diesen Trainer gibt es nicht');
    }
});


app.post('/api/newtrainer', (req, res) => {
    const {
        firstName,
        lastName,
        course,
        customerID,
    } = req.body;

    try {
        writeTrainer(firstName, lastName, course, customerID);
        res.status(201).send({ message: 'Trainer erfolgreich erstellt' });
    } catch (error) {
        console.error("Fehler beim Erstellen des Trainer:", error);
        res.status(500).send({ error: 'Fehler beim Erstellen des Trainer' });
    }
});

app.put('/api/updatetrainer/:id', (req, res) => {
    const trainerID = req.params.id
    const {
        firstName,
        lastName,
        course,
        customerID
    } = req.body;

    try {
        updateTrainer(trainerID, firstName, lastName, course, customerID);
        res.status(200).send({ message: 'Trainer erfolgreich bearbeitet' });
    } catch (error) {
        console.error("Fehler beim bearbeiten des Trainer:", error);
        res.status(500).send({ error: 'Fehler beim bearbeiten des Trainer' });
    }
})

app.delete('/api/deletetrainer/:id', (req, res) => {
    const trainerID = req.params.id

    try {
        deleteTrainer(trainerID)
        res.status(201).send({ message: 'Trainer erfolgreich gelöscht' });
    } catch (error) {
        console.error("Fehler beim löschen des Trainers:", error);
        res.status(500).send({ error: 'Fehler beim löschen des Trainers' });
    }
})

app.delete('/api/deletealltrainer', (req, res) => {
    try {
        deleteAllTrainer()
        res.status(201).send({ message: 'Trainer erfolgreich gelöscht' });
    } catch (error) {
        console.error("Fehler beim löschen des Trainers:", error);
        res.status(500).send({ error: 'Fehler beim löschen des Trainers' });
    }
})