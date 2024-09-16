// Kundendaten laden und das Formular füllen
document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('#customerForm'); // Dein Formular sollte eine ID haben
    if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Verhindert das Standardverhalten des Submit-Buttons

        const adress = `${document.getElementById('address').value.trim()}, ${document.getElementById('town').value.trim()}`;
        // Kundendaten aus den Inputfeldern abrufen
        const createCustomer = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        birthDate: document.getElementById('birthDate').value.trim(),
        address: adress,
        telefon: document.getElementById('telefon').value.trim(),
        eMail: document.getElementById('eMail').value.trim(),
        subscription: '',
        subscriptionStart: '',
        trainer: '',
        customerCardID: '',
        appointments: ''
        };

        // PUT-Anfrage an die API senden
        fetch(`http://localhost:3000/api/newcustomer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Senden als JSON
        },
        body: JSON.stringify(createCustomer) // Daten als JSON senden
        })
        .then(response => {
        if (!response.ok) {
            throw new Error('Fehler beim Aktualisieren des Kunden.');
        }
        return response.json();
        })
        .then(data => {
        // Erfolgsmeldung oder Weiterleitung nach erfolgreicher Aktualisierung
        console.log('Kundendaten erfolgreich aktualisiert:', data);

        window.location.href = '../overviewpage/overview.html';
        })
        .catch(error => {
        console.error('Fehler beim Senden der Kundendaten:', error);
        });
    });
    }

    const back = document.querySelector('#back-button');
    back.addEventListener('click', () => {
        window.location.href = '../overviewpage/overview.html';
    });
});