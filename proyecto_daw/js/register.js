document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeat-password').value;
    const termsCheckbox = document.getElementById('terms-checkbox');
    const passwordError = document.getElementById('password-error');
    const termsError = document.getElementById('terms-error');

    passwordError.textContent = '';
    termsError.textContent = '';
    let valid = true;

    if (password !== repeatPassword) {
        passwordError.textContent = 'Las contraseñas no coinciden';
        valid = false;
    }

    if (!termsCheckbox.checked) {
        termsError.textContent = 'Debes aceptar las condiciones de uso';
        valid = false;
        termsCheckbox.classList.add('error');
    } else {
        termsCheckbox.classList.remove('error');
    }

    if (valid) {
        // Aquí se hace la llamada al backend para registrar al usuario
        const requestData = {
            username: username,
            email: email,
            password: password
        };

        fetch('http://localhost:3398/api/addRegistro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(requestData)
        })
        .then(response => response.text())
        .then(data => {
            if (data === 'User registered successfully') {
                alert('Registro exitoso');
            } else {
                alert(data);
            }
        })
        .catch(error => console.error('Error:', error));
    }
});
