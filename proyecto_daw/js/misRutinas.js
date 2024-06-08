document.addEventListener('DOMContentLoaded', function() {
    cargarRutinas();
});

let cargarRutinas = async () => {
    try {
        const respuesta = await fetch("http://localhost:3398/api/rutinas", {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error(`HTTP error! status: ${respuesta.status}`);
        }

        const rutinas = await respuesta.json();
        mostrarRutinas(rutinas);
    } catch (error) {
        console.error('Error cargando rutinas:', error);
    }
};

let mostrarRutinas = (rutinas) => {
    const listaRutinas = document.querySelector('.routines-list');
    listaRutinas.innerHTML = ''; // Limpiar la lista antes de agregar las rutinas

    rutinas.forEach((rutina) => {
        const rutinaElemento = document.createElement('div');
        rutinaElemento.classList.add('routine-item');

        const imagenUrl = rutina.imagenBase64 ? `data:image/jpeg;base64,${rutina.imagenBase64}` : 'placeholder.jpg';
        
        rutinaElemento.innerHTML = `
            <img src="${imagenUrl}" alt="${rutina.titulo}" class="routine-image">
            <h3 class="routine-title">${rutina.titulo}</h3>
            <p class="routine-description">${rutina.resumen || ''}</p>
            <button class="routine-link" onclick="mostrarDetalleRutina(${rutina.id})">Ver más</button>
        `;

        listaRutinas.appendChild(rutinaElemento);
    });

    console.log(listaRutinas.innerHTML); // Verificar que los elementos se generan correctamente
};

let mostrarDetalleRutina = async (id) => {
    try {
        console.log('Rutina ID:', id); // Verificar que el ID se obtiene correctamente

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
        console.log('Rutina cargada:', rutina); // Verificar que la rutina se carga correctamente
        mostrarRutina(rutina);
    } catch (error) {
        console.error('Error cargando rutina:', error);
    }
};

let mostrarRutina = (rutina) => {
    console.log('Mostrar rutina:', rutina); // Verificar que la rutina se muestra correctamente
    document.getElementById('routine-title').innerText = rutina.titulo;
    document.getElementById('routine-description').innerText = rutina.descripcion;
    document.getElementById('routine-summary').querySelector('span').innerText = rutina.resumen;

    if (rutina.videoBase64) {
        const videoElement = document.getElementById('routine-video');
        videoElement.innerHTML = `<source src="data:video/mp4;base64,${rutina.videoBase64}" type="video/mp4">`;
        videoElement.load();
    } else {
        document.getElementById('routine-video').style.display = 'none';
    }

    if (rutina.imagenEntrenadorBase64) {
        document.getElementById('trainer-pic').src = `data:image/jpeg;base64,${rutina.imagenEntrenadorBase64}`;
    } else {
        document.getElementById('trainer-pic').style.display = 'none';
    }

    document.getElementById('trainer-name').innerText = rutina.nombreEntrenador;

    document.querySelector('.routines-section').style.display = 'none';
    document.querySelector('.routine-details-section').style.display = 'block';
};

let mostrarListaRutinas = () => {
    document.querySelector('.routines-section').style.display = 'block';
    document.querySelector('.routine-details-section').style.display = 'none';
};
