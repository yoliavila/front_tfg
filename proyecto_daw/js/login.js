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
                throw new Error('login incorrecto');
            }
            return response.json();
        })
        .then(data => {
            console.log('Login exitoso:', data);
            alert('Login exitoso');
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userId', data.id);
            localStorage.setItem('clienteId', data.clienteId);
            localStorage.setItem('username', data.username); // Guardar el nombre de usuario
            if (data.username === 'admin') {
                localStorage.setItem('isAdmin', 'true');
            } else {
                localStorage.setItem('isAdmin', 'false');
            }
            window.location.href = 'index.html';
        })
        .catch(error => {
            console.error('Error en el login:', error);
            errorDiv.textContent = 'login incorrecto';
        });
    } else {
        errorDiv.textContent = 'Por favor, complete todos los campos.';
    }
});
