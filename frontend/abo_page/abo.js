document.addEventListener('DOMContentLoaded', () => {
    const cardObject = [
        `<h2>Klassisches Abo</h2><p class='price'>19,99 €</p><ul><li>12 Monate Mindestvertragslaufzeit</li><li>Kostenlose Getränkenachfüller</li><li>Nutzung der Geräte Indoor und Outdoor</li></ul>`,
        `<h2>Premium Abo</h2><p class='price'>69,99 €</p><ul><li>12 Monate Mindestvertragslaufzeit</li><li>Kostenlose Getränkenachfüller</li><li>Nutzung der Geräte Indoor und Outdoor</li><li>Personal Trainer</li><li>Trainigsangebote inkl. Kurse</li></ul>`,
        `<h2>Gold Abo</h2><p class='price'>39,99 €</p><ul><li>12 Monate Mindestvertragslaufzeit</li><li>Kostenlose Getränkenachfüller</li><li>Nutzung der Geräte Indoor und Outdoor</li><li>Personal Trainer</li></ul>`,
    ];

    let mainCard = 0;
    let prevCard = cardObject.length - 1;
    let nextCard = 1;

    function loadGallery() {
        document.getElementById("mainView").innerHTML = cardObject[mainCard];
        document.getElementById("leftView").innerHTML = cardObject[prevCard];
        document.getElementById("rightView").innerHTML = cardObject[nextCard];
    }

    function scrollRight() {
        prevCard = mainCard;
        mainCard = nextCard;
        nextCard = (nextCard + 1) % cardObject.length;
        loadGallery();
    }

    function scrollLeft() {
        nextCard = mainCard;
        mainCard = prevCard;
        prevCard = (prevCard - 1 + cardObject.length) % cardObject.length;
        loadGallery();
    }

    document.getElementById("navRight").addEventListener("click", scrollRight);
    document.getElementById("navLeft").addEventListener("click", scrollLeft);
    
    document.addEventListener('keyup', function(e) {
        if (e.key === "ArrowLeft") { // Pfeil nach links
            scrollLeft();
        } else if (e.key === "ArrowRight") { // Pfeil nach rechts
            scrollRight();
        }
    });

    loadGallery(); // Galerie beim Laden initialisieren
});
