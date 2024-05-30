document.addEventListener('DOMContentLoaded', function() {
    cargarRecetas();
});

let cargarRecetas = async () => {
    try {
        const respuesta = await fetch("http://localhost:3398/api/recetas", {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error(`HTTP error! status: ${respuesta.status}`);
        }

        const recetas = await respuesta.json();
        mostrarRecetas(recetas);
    } catch (error) {
        console.error('Error cargando recetas:', error);
    }
};

let mostrarRecetas = (recetas) => {
    const listaRecetas = document.querySelector('.diets-list');
    listaRecetas.innerHTML = ''; // Limpiar la lista antes de agregar las recetas

    recetas.forEach(receta => {
        const recetaElemento = document.createElement('div');
        recetaElemento.classList.add('diet-item');

        recetaElemento.innerHTML = `
            <img src="hero1.jpeg" alt="${receta.titulo}" class="diet-image">
            <h3 class="diet-title">${receta.titulo}</h3>
            <p class="diet-description">${receta.resumen || ''}</p>
            <a href="visualizarReceta.html?id=${receta.id}" class="diet-link">Ver más</a>
        `;

        listaRecetas.appendChild(recetaElemento);
    });
};
