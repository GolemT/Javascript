import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { readAllCustomer, writeCustomer, readCustomer, deleteAllCustomer, updatecustomer, deleteCustomer, aboManager, cardManager, customerTrainerManager, writeTrainer, readAllTrainer, readTrainer, updateTrainer, deleteTrainer, deleteAllTrainer } from './backend/manager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'frontend')));

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});

app.use(express.json()) 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Erlaubt Anfragen von allen Domains
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Erlaubt die HTTP-Methoden
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Erlaubt bestimmte Header
  
    // Wenn die Anfrage eine "OPTIONS"-Anfrage ist, direkt mit Status 200 antworten
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
  
    next();
  });

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
        if(error.message == "Kunden mit der ID nicht gefunden"){
            res.status(404).send({ error: error.message });
        }else{
            res.status(500).send({ error: 'Fehler beim finden des Kundens' });
        }
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
        subscription,
        subscriptionStart,
        trainer,
        customerCardID,
        appointments
    } = req.body;

    try {
        writeCustomer(firstName, lastName, birthDate, address, telefon, eMail, subscription, subscriptionStart, trainer, customerCardID, appointments);
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
        trainer,
        appointments
    } = req.body;

    try {
        updatecustomer(customerID, firstName, lastName, birthDate, address, telefon, eMail, trainer, appointments);
        res.status(200).send({ message: 'Kunde erfolgreich bearbeitet' });
    } catch (error) {
        if(error.message == "Kunde mit der ID nicht gefunden"){
            res.status(404).send({ error: error.message });
        }else{
            res.status(500).send({ error: 'Fehler beim bearbeiten des Kundens' });
        }
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
        if(error.message == "Kunde mit der ID nicht gefunden"){
            res.status(404).send({ error: error.message });
        }else{
            res.status(500).send({ error: 'Fehler beim bearbeiten des Abos' });
        }
    }
})

app.put('/api/card/:id', (req, res) => {
    const customerID = req.params.id
    const {
        customerCardID
    } = req.body;

    try {
        cardManager(customerID, customerCardID);
        res.status(200).send({ message: 'Karte wurde hinzugefügt' });
    } catch (error) {
        if(error.message == "Kunde mit der ID nicht gefunden"){
            res.status(404).send({ error: error.message });
        }else{
            res.status(500).send({ error: 'Fehler beim bearbeiten der Kundenkarte' });
        }
    }
})

app.put('/api/customertrainer/:id', (req, res) => {
    const customerID = req.params.id
    const {
        trainer
    } = req.body;

    try {
        customerTrainerManager(customerID, trainer);
        res.status(200).send({ message: 'Trainer wurde hinzugefügt' });
    } catch (error) {
        if(error.message == "Kunde mit der ID nicht gefunden"){
            res.status(404).send({ error: error.message });
        }else{
            res.status(500).send({ error: 'Fehler beim bearbeiten des Personaltrainers' });
        }
    }
})



app.delete('/api/deletecustomer/:id', (req, res) => {
    const customerID = req.params.id

    try {
        deleteCustomer(customerID)
        res.status(200).send({ message: 'Kunden erfolgreich gelöscht' });
    } catch (error) {
        console.error("Fehler beim löschen des Kunden:", error);
        if(error.message == "Kunden mit der ID nicht gefunden"){
            res.status(404).send({ error: error.message });
        }else{
            res.status(500).send({ error: 'Fehler beim löschen des Kunden' });
        }
    }
})

app.delete('/api/deleteallcustomer', (req, res) => {
    try {
        deleteAllCustomer()
        res.status(200).send({ message: 'Kunden erfolgreich gelöscht' });
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
        console.error("Fehler beim finden des Trainers:", error);
        if(error.message == "Trainer mit der ID nicht gefunden"){
            res.status(404).send({ error: error.message });
        }else{
            res.status(500).send({ error: 'Fehler beim finden des Trainers' });
        }
    };
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
        console.error("Fehler beim bearbeiten des Trainers:", error);
        if(error.message == "Trainer mit der ID nicht gefunden"){
            res.status(404).send({ error: error.message });
        }else{
            res.status(500).send({ error: 'Fehler beim bearbeiten des Trainers' });
        }
    }
})

app.delete('/api/deletetrainer/:id', (req, res) => {
    const trainerID = req.params.id

    try {
        deleteTrainer(trainerID)
        res.status(200).send({ message: 'Trainer erfolgreich gelöscht' });
    } catch (error) {
        console.error("Fehler beim löschen des Trainers:", error);
        if(error.message == "Trainer mit der ID nicht gefunden"){
            res.status(404).send({ error: error.message });
        }else{
            res.status(500).send({ error: 'Fehler beim löschen des Trainers' });
        }
    }
})

app.delete('/api/deletealltrainer', (req, res) => {
    try {
        deleteAllTrainer()
        res.status(200).send({ message: 'Trainer erfolgreich gelöscht' });
    } catch (error) {
        console.error("Fehler beim löschen der Trainer:", error);
        res.status(500).send({ error: 'Fehler beim löschen der Trainer' });
    }
})