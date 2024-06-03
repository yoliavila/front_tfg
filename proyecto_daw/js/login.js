document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error-message');

    errorDiv.textContent = '';

    if (username && password) {
        const loginData = {
            username: username,
            password: password
        };

        fetch("http://localhost:3398/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('El usuario no existe');
                } else if (response.status === 401) {
                    throw new Error('Contraseña incorrecta');
                } else {
                    throw new Error(`Error HTTP! status: ${response.status}`);
                }
            }
            return response.json();
        })
        .then(data => {
            console.log('Login exitoso:', data);
            alert('Login exitoso');
            localStorage.setItem('isAuthenticated', 'true');
            if (username === 'admin') {
                localStorage.setItem('isAdmin', 'true');
            } else {
                localStorage.setItem('isAdmin', 'false');
            }
            window.location.href = 'index.html';
        })
        .catch(error => {
            console.error('Error en el login:', error);
            errorDiv.textContent = error.message;
        });
    } else {
        errorDiv.textContent = 'Por favor, complete todos los campos.';
    }
});
