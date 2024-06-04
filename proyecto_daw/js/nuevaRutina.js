document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector(".submit-button").addEventListener("click", (evento) => {
        evento.preventDefault();  // Evita el envío del formulario por defecto
        registrarRutina();
    });
});

let registrarRutina = async () => {
    const formData = new FormData();
    formData.append('titulo', document.getElementById('titulo').value);
    formData.append('resumen', document.getElementById('resumen').value);
    formData.append('descripcion', document.getElementById('descripcion').value);
    formData.append('entrenador', document.getElementById('entrenador').value);
    formData.append('imagen', document.getElementById('foto').files[0]);
    formData.append('video', document.getElementById('video').files[0]);

    try {
        const peticion = await fetch('http://localhost:3398/api/registrarRutinas', {
            method: 'POST',
            body: formData
        });

        if (peticion.ok) {
            const respuesta = await peticion.json();
            console.log('Rutina registrada exitosamente:', respuesta);
            alert('Rutina registrada exitosamente');
            // Limpiar el formulario si es necesario
            document.querySelector('.routine-form').reset();
        } else {
            const errorText = await peticion.text();
            throw new Error(`HTTP error! status: ${peticion.status}, message: ${errorText}`);
        }
    } catch (error) {
        console.error('Error registrando rutina:', error);
        alert('Error registrando rutina: ' + error.message);
    }
};
