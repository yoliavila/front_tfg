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

    rutinas.forEach(rutina => {
        const rutinaElemento = document.createElement('div');
        rutinaElemento.classList.add('routine-item');

        rutinaElemento.innerHTML = `
            <img src="hero1.jpeg" alt="${rutina.titulo}" class="routine-image">
            <h3 class="routine-title">${rutina.titulo}</h3>
            <p class="routine-description">${rutina.resumen || ''}</p>
            <a href="visualizarRutina.html?id=${rutina.id}" class="routine-link">Ver más</a>
        `;

        listaRutinas.appendChild(rutinaElemento);
    });
};
