document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('edit-routine-form');
    const successMessage = document.getElementById('success-message');
    const urlParams = new URLSearchParams(window.location.search);
    const rutinaId = urlParams.get('id');

    // Cargar datos de la rutina
    fetch(`http://localhost:3398/api/rutina/${rutinaId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('titulo').value = data.titulo;
            document.getElementById('descripcion').value = data.descripcion;
            document.getElementById('resumen').value = data.resumen;
            document.getElementById('entrenador').value = data.entrenador.nombre;
        })
        .catch(error => console.error('Error cargando los datos de la rutina:', error));

    // Manejar el envío del formulario
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('titulo', document.getElementById('titulo').value);
        formData.append('descripcion', document.getElementById('descripcion').value);
        formData.append('resumen', document.getElementById('resumen').value);
        formData.append('entrenador', document.getElementById('entrenador').value);

        const imagen = document.getElementById('imagen').files[0];
        if (imagen) {
            formData.append('imagen', imagen);
        }

        const video = document.getElementById('video').files[0];
        if (video) {
            formData.append('video', video);
        }

        fetch(`http://localhost:3398/api/rutina/${rutinaId}`, {
            method: 'PUT',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al actualizar la rutina');
            }
            return response.json();
        })
        .then(data => {
            successMessage.style.display = 'block';
        })
        .catch(error => console.error('Error actualizando la rutina:', error));
    });
});
