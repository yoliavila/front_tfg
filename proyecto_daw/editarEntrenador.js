document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('edit-trainer-form');
    const successMessage = document.getElementById('success-message');
    const urlParams = new URLSearchParams(window.location.search);
    const entrenadorId = urlParams.get('id');

    // Cargar datos del entrenador
    fetch(`http://localhost:3398/api/entrenador/${entrenadorId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('nombre').value = data.nombre;
            document.getElementById('estudios').value = data.estudios;
        })
        .catch(error => console.error('Error cargando los datos del entrenador:', error));

    // Manejar el envío del formulario
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('nombre', document.getElementById('nombre').value);
        formData.append('estudios', document.getElementById('estudios').value);

        const imagen = document.getElementById('imagen').files[0];
        if (imagen) {
            formData.append('imagen', imagen);
        }

        fetch(`http://localhost:3398/api/entrenador/${entrenadorId}`, {
            method: 'PUT',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al actualizar el entrenador');
            }
            return response.json();
        })
        .then(data => {
            successMessage.style.display = 'block';
        })
        .catch(error => console.error('Error actualizando el entrenador:', error));
    });
});
