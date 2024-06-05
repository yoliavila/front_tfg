document.getElementById('entrenadorForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('nombre', document.getElementById('nombre').value);
    formData.append('estudios', document.getElementById('estudios').value);
    formData.append('imagen', document.getElementById('imagen').files[0]);

    fetch('http://localhost:3398/api/registrarEntrenador', {
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
        console.log('Entrenador registrado exitosamente:', data);
        alert('Entrenador registrado exitosamente');
        // Limpiar el formulario si es necesario
        document.getElementById('entrenadorForm').reset();
    })
    .catch(error => {
        console.error('Error al registrar el entrenador:', error);
        alert('Error al registrar el entrenador: ' + error.message);
    });
});
