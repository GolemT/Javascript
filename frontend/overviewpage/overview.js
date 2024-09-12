// Funktion, um die Akkordeons mit den abgerufenen Kundendaten zu generieren
function generateAccordions(customers) {
  const accordionContainer = document.getElementById('accordion-container');
  accordionContainer.innerHTML = ''; // Vorherige Inhalte löschen

  // Durch die Kunden iterieren und Akkordeons erstellen
  customers.forEach(customer => {
    // Akkordeon-Button erstellen
    const accordion = document.createElement('div');
    accordion.classList.add('accordion');

    // Inneren Content-Container erstellen
    const content = document.createElement('div');
    content.classList.add('accordion-content');

    // Name
    const nameSpan = document.createElement('span');
    nameSpan.classList.add('name');
    nameSpan.innerText = `${customer.firstName} ${customer.lastName}`;

    // Geburtsdatum
    const birthDateSpan = document.createElement('span');
    birthDateSpan.classList.add('birth-date');
    birthDateSpan.innerText = `Geb.: ${customer.birthDate}`;

    // Kundennummer
    const customerIdSpan = document.createElement('span');
    customerIdSpan.classList.add('customer-id');
    customerIdSpan.innerText = `M-Nr.: ${customer.customerID}`;

    // Die Spans in den Content-Container hinzufügen
    content.appendChild(nameSpan);
    content.appendChild(birthDateSpan);
    content.appendChild(customerIdSpan);

    // Content-Container in das Akkordeon einfügen
    accordion.appendChild(content);

    // Panel für die Kundeninformationen
    const panel = document.createElement('div');
    panel.classList.add('panel');
    panel.innerHTML = `
      <div class="table-container">
        <table class="main-table">
          <tr><th>Name:</th><td> ${customer.firstName} ${customer.lastName}</td></tr>
          <tr><th>Geb.:</th><td> ${customer.birthDate}</td></tr>
          <tr><th>Adresse:</th><td> ${customer.address}</td></tr>
          <tr><th>Telefon:</th><td> ${customer.telefon}</td></tr>
          <tr><th>E-Mail:</th><td> ${customer.eMail}</td></tr>
        </table>

        <table class="extra-table">
          <tr><th>Abomodell:</th><td> ${customer.subscription}</td></tr>
          <tr><th>Beitrag:</th><td>19.99</td></tr>
          <tr><th>Abo-Start:</th><td> ${customer.subscriptionStart}</td></tr>
        </table>
      </div>
      <span class='buttons'>
        <button class='button-edit'>bearbeiten</button>
        <button class='button-delete'>löschen</button>
      </span>
    `;

    // Eventlistener für Akkordeon zum Öffnen und Schließen
    accordion.addEventListener('click', () => {
      accordion.classList.toggle('active');
      panel.style.maxHeight = panel.style.maxHeight ? null : panel.scrollHeight + "px";
    });

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
    // Daten von der API abrufen
    const response = await fetch('http://localhost:3000/api/allcustomer');
    const items = await response.json(); // API-Antwort in JSON umwandeln
    
    // Akkordeons generieren
    generateAccordions(items);
  } catch (error) {
    console.error('Fehler beim Abrufen der Kunden:', error);
  }
}

// Funktion aufrufen, um die Akkordeons zu generieren
fetchAndGenerateAccordions();
