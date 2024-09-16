// Funktion zum Erstellen eines Akkordeons
function createAccordion(customer) {
  const accordion = document.createElement('div');
  accordion.classList.add('accordion');

  const content = document.createElement('div');
  content.classList.add('accordion-content');

  const nameSpan = document.createElement('span');
  nameSpan.classList.add('name');
  nameSpan.innerText = `${customer.firstName} ${customer.lastName}`;

  const birthDateSpan = document.createElement('span');
  birthDateSpan.classList.add('birth-date');
  birthDateSpan.innerText = `Geb.: ${customer.birthDate}`;

  const customerIdSpan = document.createElement('span');
  customerIdSpan.classList.add('customer-id');
  customerIdSpan.innerText = `M-Nr.: ${customer.customerID}`;

  content.appendChild(nameSpan);
  content.appendChild(birthDateSpan);
  content.appendChild(customerIdSpan);

  accordion.appendChild(content);

  return accordion;
}

// Funktion zum Erstellen des Panel-HTMLs aus dem Template-Tag
function getPanelHTMLFromTemplate(customer) {
  const template = document.getElementById('customer-panel-template').innerHTML;

  var price = "0,00€";

  switch (customer.subscription) {
    case "Klassisch":
      price = "19,99€";
      break;
    case "Gold":
      price = "39,99€";
      break;
    case "Platin":
      price = "69,99€";
      break;
  
    default:
      break;
  }

  // Platzhalter mit Kundendaten ersetzen
  return template
    .replace('FIRST_NAME', customer.firstName)
    .replace('LAST_NAME', customer.lastName)
    .replace('BIRTH_DATE', customer.birthDate)
    .replace('ADDRESS', customer.address)
    .replace('TELEFON', customer.telefon)
    .replace('E_MAIL', customer.eMail)
    .replace('SUBSCRIPTION', customer.subscription)
    .replace('PRICE', price)
    .replace('SUBSCRIPTION_START', customer.subscriptionStart)
    .replace('CARD_ID', customer.customerCardID)
    .replace('TRAINER', customer.trainer)
    .replace('C_ID', customer.customerID)
    .replace('C_ID', customer.customerID)
    .replace('C_ID', customer.customerID)
    .replace('C_ID', customer.customerID);
}

// Funktion zum Erstellen des Panels
function createPanel(customer) {
  const panel = document.createElement('div');
  panel.classList.add('panel');
  panel.innerHTML = getPanelHTMLFromTemplate(customer);

  const select = panel.querySelector('#tariff');
  const options = select.options;

  // Wenn der Kunde ein Abo hat, diesen vorauswählen, sonst "Tarif wählen"
  for ( let i = 0; i < options.length; i++) {
    if (options[i].value === customer.subscription) {
      options[i].selected = true;
      break;
    } else {
      options[3].selected = true; // "Tarif wählen"
    }
  }

  const select_trainer = panel.querySelector('#trainer');
  const options_trainer = select_trainer.options;

  for ( let i = 0; i < options_trainer.length; i++) {
    if (options_trainer[i].value === customer.trainer) {
      options_trainer[i].selected = true;
      break;
    } else {
      options_trainer[5].selected = true;
    }
  }

  const select_card = panel.querySelector('#card_id');
  const options_card = select_card.options;

  // Wenn der Kunde ein Abo hat, diesen vorauswählen, sonst "Tarif wählen"
  for ( let i = 0; i < options_card.length; i++) {
    if (options_card[i].value === customer.customerCardID) {
      options_card[i].selected = true;
      break;
    } else {
      options_card[5].selected = true; // "Tarif wählen"
    }
  }

  // Eventlistener für den "löschen"-Button
panel.querySelector('#delete').addEventListener('click', () => {
  deleteCustomer(customer.customerID); // Aufruf der Löschfunktion
});

  return panel;
}

// Funktion zum Anzeigen und Einstellen des aktuellen Tarifs
function show(id) {
  const popup = $(id);
  popup.style.display = 'block';

  switch (id) {
    case 'popup_card':
      saveCard();
      break;
    case 'popup_trainer':
      saveTrainer();
      break;
    case 'popup_tariff':
      saveTariff();
      break;
    case 'popup_delete':
      deleteCustomer();
      break;
    default:
      break;
  }
}

function addAccordionEventListener(accordion, panel) {
  accordion.addEventListener('click', () => {
    // Prüfen, ob das Akkordeon bereits aktiv ist
    const isActive = accordion.classList.contains('active');

    // Alle anderen Akkordeons deaktivieren
    const allAccordions = document.querySelectorAll('.accordion');
    allAccordions.forEach(acc => acc.classList.remove('active'));

    // Alle Panels schließen
    const allPanels = document.querySelectorAll('.panel');
    allPanels.forEach(p => p.style.maxHeight = null);

    // Wenn es nicht aktiv ist, setze es auf aktiv
    if (!isActive) {
      accordion.classList.add('active');
      panel.style.maxHeight = panel.scrollHeight + "px"; // Panel öffnen
    }
  });
}

let customerDataMap = {};

// Funktion, um die Akkordeons mit den abgerufenen Kundendaten zu generieren
function generateAccordions(customers) {
  const accordionContainer = document.getElementById('accordion-container');
  accordionContainer.innerHTML = ''; // Vorherige Inhalte löschen

  // Durch die Kunden iterieren und Akkordeons erstellen
  customers.forEach(customer => {
    customerDataMap[customer.customerID] = customer;

    const accordion = createAccordion(customer);
    const panel = createPanel(customer);

    // Eventlistener hinzufügen
    addAccordionEventListener(accordion, panel);

    // Eventlistener für den "bearbeiten"-Button
    panel.querySelector('.button-edit').addEventListener('click', () => {
      window.location.href = `../edit_customer_page/edit.html?customerID=${customer.customerID}`;
    });

    // Akkordeon und Panel zum Container hinzufügen
    accordionContainer.appendChild(accordion);
    accordionContainer.appendChild(panel);
  });
}

// API-Abfrage und Generierung der Akkordeons
async function fetchAndGenerateAccordions() {
  try {
    const response = await fetch('http://localhost:3000/api/allcustomer');
    const items = await response.json(); // API-Antwort in JSON umwandeln
    
    // Akkordeons generieren
    generateAccordions(items);
  } catch (error) {
    console.error('Fehler beim Abrufen der Kunden:', error);
  }
}

// Funktion zum Speichern des Tarifs
async function saveTariff() {
  const saveButton = document.querySelector('#save-tariff');
  const tariffSelect = document.getElementById('tariff');

  saveButton.addEventListener('click', async () => {
    const selectedTariff = tariffSelect.value;

    // Überprüfen, ob ein aktives Akkordeon vorhanden ist
    const activeAccordion = document.querySelector('.accordion.active');
    if (!activeAccordion) {
      console.error('Kein aktives Akkordeon vorhanden.');
      return;
    }

    // Hole die aktuelle Kunden-ID aus dem aktiven Akkordeon
    const customerIDElement = activeAccordion.querySelector('.customer-id');
    if (!customerIDElement) {
      console.error('Kunden-ID konnte nicht gefunden werden.');
      return;
    }
    
    const customerID = customerIDElement.innerText.split(': ')[1]; // Extrahiere die ID

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Formatieren des heutigen Datums

    const updateData = { 
      subscription: selectedTariff,
      subscriptionStart: formattedDate
    };

    try {
      // Führe den API-Call aus
      const response = await fetch(`http://localhost:3000/api/abo/${customerID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Erfolg:', data);

         // Seite neu laden, um die aktualisierten Daten anzuzeigen
         window.location.reload();
      } else {
        console.error('Fehler beim Update:', await response.text());
      }

    } catch (error) {
      console.error('Fehler beim Update:', error);
    }
  });
}

// Funktion zum Speichern des Trainers
async function saveTrainer() {
  const saveButton = document.querySelector('#save-trainer');
  const trainerSelect = document.getElementById('trainer');

  saveButton.addEventListener('click', async () => {
    const selectedTrainer = trainerSelect.value;

    // Überprüfen, ob ein aktives Akkordeon vorhanden ist
    const activeAccordion = document.querySelector('.accordion.active');
    if (!activeAccordion) {
      console.error('Kein aktives Akkordeon vorhanden.');
      return;
    }

    // Hole die aktuelle Kunden-ID aus dem aktiven Akkordeon
    const customerIDElement = activeAccordion.querySelector('.customer-id');
    if (!customerIDElement) {
      console.error('Kunden-ID konnte nicht gefunden werden.');
      return;
    }
    
    const customerID = customerIDElement.innerText.split(': ')[1]; // Extrahiere die ID

    const updateData = { 
      trainer: selectedTrainer
    };

    try {
      // Führe den API-Call aus
      const response = await fetch(`http://localhost:3000/api/customertrainer/${customerID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Erfolg:', data);

         // Seite neu laden, um die aktualisierten Daten anzuzeigen
         window.location.reload();
      } else {
        console.error('Fehler beim Update:', await response.text());
      }

    } catch (error) {
      console.error('Fehler beim Update:', error);
    }
  });
}

// Funktion zum Speichern der Kundenkarte
async function saveCard() {
  const saveButton = document.querySelector('#save-card');
  const cardSelect = document.getElementById('card_id');

  saveButton.addEventListener('click', async () => {
    const selectedCard = cardSelect.value;

    // Überprüfen, ob ein aktives Akkordeon vorhanden ist
    const activeAccordion = document.querySelector('.accordion.active');
    if (!activeAccordion) {
      console.error('Kein aktives Akkordeon vorhanden.');
      return;
    }

    // Hole die aktuelle Kunden-ID aus dem aktiven Akkordeon
    const customerIDElement = activeAccordion.querySelector('.customer-id');
    if (!customerIDElement) {
      console.error('Kunden-ID konnte nicht gefunden werden.');
      return;
    }
    
    const customerID = customerIDElement.innerText.split(': ')[1]; // Extrahiere die ID

    const updateData = { 
      customerCardID: selectedCard
    };

    try {
      // Führe den API-Call aus
      const response = await fetch(`http://localhost:3000/api/card/${customerID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Erfolg:', data);

         // Seite neu laden, um die aktualisierten Daten anzuzeigen
         window.location.reload();
      } else {
        console.error('Fehler beim Update:', await response.text());
      }

    } catch (error) {
      console.error('Fehler beim Update:', error);
    }
  });
}
// Funktion aufrufen, um die Akkordeons zu generieren
fetchAndGenerateAccordions();

function $(id) {
  return document.getElementById(id);
}

function hide(id) {
  $(id).style.display = 'none';
}

const createButton = document.querySelector('#create-button');

createButton.addEventListener('click', () => {
  window.location.href = '../create_customer_page/create.html';
})

// Funktion zum Löschen des Kunden
async function deleteCustomer() {
  const deleteButton = document.querySelector('#delete');

  deleteButton.addEventListener('click', async () => {
    // Überprüfen, ob ein aktives Akkordeon vorhanden ist
    const activeAccordion = document.querySelector('.accordion.active');
    if (!activeAccordion) {
      console.error('Kein aktives Akkordeon vorhanden.');
      return;
    }

    // Hole die aktuelle Kunden-ID aus dem aktiven Akkordeon
    const customerIDElement = activeAccordion.querySelector('.customer-id');
    if (!customerIDElement) {
      console.error('Kunden-ID konnte nicht gefunden werden.');
      return;
    }
    
    const customerID = customerIDElement.innerText.split(': ')[1]; // Extrahiere die ID

    try {
      const response = await fetch(`http://localhost:3000/api/deletecustomer/${customerID}`, {
        method: 'DELETE', // Verwende die DELETE-Methode
      });
      
      if (response.ok) {
        console.log(`Kunde mit ID ${customerID} wurde erfolgreich gelöscht.`);
        // Seite neu laden, um die Änderungen anzuzeigen
        window.location.reload();
      } else {
        console.error('Fehler beim Löschen des Kunden:', await response.text());
      }
    } catch (error) {
      console.error('Fehler bei der Löschanfrage:', error);
    }
  })
  };