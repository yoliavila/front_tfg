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

    recetas.forEach((receta) => {
        const recetaElemento = document.createElement('div');
        recetaElemento.classList.add('diet-item');

        const imagenUrl = receta.imagenBase64 ? `data:image/jpeg;base64,${receta.imagenBase64}` : 'placeholder.jpg';
        
        recetaElemento.innerHTML = `
            <img src="${imagenUrl}" alt="${receta.titulo}" class="diet-image">
            <h3 class="diet-title">${receta.titulo}</h3>
            <p class="diet-description">${receta.resumen || ''}</p>
            <button class="diet-link" onclick="mostrarDetalleReceta(${receta.id})">Ver más</button>
        `;

        listaRecetas.appendChild(recetaElemento);
    });

    console.log(listaRecetas.innerHTML); // Verificar que los elementos se generan correctamente
};

let mostrarDetalleReceta = async (id) => {
    try {
        console.log('Receta ID:', id); // Verificar que el ID se obtiene correctamente

        const respuesta = await fetch(`http://localhost:3398/api/receta/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error(`HTTP error! status: ${respuesta.status}`);
        }

        const receta = await respuesta.json();
        console.log('Receta cargada:', receta); // Verificar que la receta se carga correctamente
        mostrarReceta(receta);
    } catch (error) {
        console.error('Error cargando receta:', error);
    }
};

let mostrarReceta = (receta) => {
    const recipeInfo = document.getElementById('recipeInfo');
    recipeInfo.innerHTML = `
        <h1 id="recipe-title">${receta.titulo}</h1>
        <video controls>
            <source src="data:video/mp4;base64,${receta.videoBase64}" type="video/mp4">
            Tu navegador no soporta la reproducción de videos.
        </video>
        <p id="recipe-description">${receta.descripcion}</p>
        <button onclick="mostrarListaRecetas()">Volver</button>
    `;
    document.querySelector('.diets-list-section').style.display = 'none';
    document.querySelector('.recipe-details-section').style.display = 'block';
};

let mostrarListaRecetas = () => {
    document.querySelector('.diets-list-section').style.display = 'block';
    document.querySelector('.recipe-details-section').style.display = 'none';
};
