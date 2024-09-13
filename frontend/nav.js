document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-link');
    const currentLocation = window.location.pathname;

    links.forEach(link => {
const linkPath = new URL(link.getAttribute('href'), window.location.origin).pathname;

        if (linkPath === currentLocation) {
            link.classList.add('active');
        }
    });
});