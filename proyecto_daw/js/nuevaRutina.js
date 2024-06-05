document.getElementById('routine-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('titulo', document.getElementById('titulo').value);
    formData.append('resumen', document.getElementById('resumen').value);
    formData.append('descripcion', document.getElementById('descripcion').value);
    formData.append('entrenador', document.getElementById('entrenador').value);
    formData.append('imagen', document.getElementById('foto').files[0]);
    formData.append('video', document.getElementById('video').files[0]);

    fetch('http://localhost:3398/api/registrarRutina', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.text().then(text => { throw new Error(text) });
    })
    .then(data => {
        console.log('Rutina registrada exitosamente:', data);
        alert('Rutina registrada exitosamente');
        // Limpiar el formulario si es necesario
        document.getElementById('routine-form').reset();
    })
    .catch(error => {
        console.error('Error al registrar la rutina:', error);
        alert('Error al registrar la rutina: ' + error.message);
    });
});
