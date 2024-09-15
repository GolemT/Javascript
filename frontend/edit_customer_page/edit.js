function getCustomerIDFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('customerID');  // Gibt die customerID zurück, falls vorhanden
}

function addCustomerHeader(customer) {
    const header = document.createElement('h2');
    header.innerText = `Mitgliedsnummer: ${customer.customerID}`;

    // Füge die Überschrift in den Container ein
    const container = document.querySelector('.customer-header');
    if (container) {
        container.appendChild(header);
    }
}

// Kundendaten in die Inputfelder einfügen
function populateCustomerForm(customer) {
    document.getElementById('firstName').value = customer.firstName;
    document.getElementById('lastName').value = customer.lastName;
    document.getElementById('birthDate').value = customer.birthDate;

    const addressParts = customer.address.split(','); // Trennt die Adresse am Komma
    const street = addressParts[0]?.trim();
    const city = addressParts[1]?.trim();

    document.getElementById('address').value = street;
    document.getElementById('town').value = city
    document.getElementById('telefon').value = customer.telefon;
    document.getElementById('eMail').value = customer.eMail;
}

// Kundendaten laden und das Formular füllen
document.addEventListener('DOMContentLoaded', () => {
    const customerID = getCustomerIDFromURL();

    const form = document.querySelector('#customerForm'); // Dein Formular sollte eine ID haben
    if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Verhindert das Standardverhalten des Submit-Buttons

        const adress = `${document.getElementById('address').value.trim()}, ${document.getElementById('town').value.trim()}`;
        // Kundendaten aus den Inputfeldern abrufen
        const updatedCustomer = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        birthDate: document.getElementById('birthDate').value.trim(),
        address: adress,
        telefon: document.getElementById('telefon').value.trim() || customer.telefon,
        eMail: document.getElementById('eMail').value.trim(),
        subscription: customer.subscription,
        subscriptionStart: customer.subscriptionStart,
        trainer: customer.trainer,
        customerCardID: customer.customerCardID,
        appointments: customer.appointments
        };

        // PUT-Anfrage an die API senden
        fetch(`http://localhost:3000/api/updatecustomer/${customerID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json', // Senden als JSON
        },
        body: JSON.stringify(updatedCustomer) // Daten als JSON senden
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

    if (customerID) {
        // API-Anfrage zum Abrufen der Kundendaten
        fetch(`http://localhost:3000/api/customer/${customerID}`)
        .then(response => response.json())
        .then(data => {

            customer = data;
            // Kundendaten in das Formular einfügen
            populateCustomerForm(data);
            addCustomerHeader(data);
        })
        .catch(error => console.error('Fehler beim Laden der Kundendaten:', error));
    }
});