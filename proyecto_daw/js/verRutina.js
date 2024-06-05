document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const rutinaId = urlParams.get('id');
    if (rutinaId) {
        cargarRutina(rutinaId);
    }
});

let cargarRutina = async (id) => {
    try {
        const respuesta = await fetch(`http://localhost:3398/api/rutina/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error(`HTTP error! status: ${respuesta.status}`);
        }

        const rutina = await respuesta.json();
        mostrarRutina(rutina);
    } catch (error) {
        console.error('Error cargando rutina:', error);
    }
};

let mostrarRutina = (rutina) => {
    document.getElementById('routine-title').innerText = rutina.titulo;
    document.getElementById('routine-description').innerText = rutina.descripcion;
    document.getElementById('routine-summary').innerText = rutina.resumen;
    const videoElement = document.getElementById('routine-video');
    videoElement.src = `data:video/mp4;base64,${rutina.videoBase64}`;
    const trainerPicElement = document.getElementById('trainer-pic');
    trainerPicElement.src = `data:image/jpeg;base64,${rutina.imagenEntrenadorBase64}`;
    document.getElementById('trainer-name').innerText = rutina.nombreEntrenador;
};
