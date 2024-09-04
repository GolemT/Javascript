document.getElementById('receptionist-login').addEventListener('click', async () => {
    login('testuser1@example.com', 'testpassword1');
});

    document.getElementById('trainer-login').addEventListener('click', () => {
        login('testuser2@example.com', 'testpassword2');
    });
    
    document.getElementById('admin-login').addEventListener('click', () => {
        login('testuser3@example.com', 'testpassword3');
    });
    
    document.getElementById('home-button').addEventListener('click', () => {
        window.location.href = '/index.html';  // Pfad zur Homepage
    });

    async function login(email, password) {
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            const statusText = document.getElementById('login-status');
    
            if (response.ok) {
                const result = await response.json();
                statusText.textContent = 'Login erfolgreich: ' + result.message;
                statusText.style.color = 'green';
            } else {
                const error = await response.json();
                statusText.textContent = 'Login fehlgeschlagen: ' + error.error;
                statusText.style.color = 'red';
            }
        } catch (error) {
            console.error('Fehler beim Login:', error);
            statusText.textContent = 'Ein Fehler ist aufgetreten.';
            statusText.style.color = 'red';
        }
    }