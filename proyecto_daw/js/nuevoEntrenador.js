document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('create-trainer-form');
    const successMessage = document.getElementById('success-message');

    // Manejar el envío del formulario
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const entrenador = {
            nombre: document.getElementById('nombre').value,
            estudios: document.getElementById('estudios').value
        };

        fetch('http://localhost:3398/api/registrarEntrenadores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entrenador)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al crear el entrenador');
            }
            return response.json();
        })
        .then(data => {
            successMessage.style.display = 'block';
            form.reset(); // Limpiar el formulario después de crear el entrenador
        })
        .catch(error => console.error('Error creando el entrenador:', error));
    });
});
