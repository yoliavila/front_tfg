document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
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
        // Aquí se haría la llamada al backend para registrar al usuario
        console.log('Formulario válido, registrando usuario...');
    }
});
