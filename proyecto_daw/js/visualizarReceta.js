document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const recetaId = urlParams.get('id');
    console.log('Receta ID:', recetaId); // Verificar que el ID se obtiene correctamente
    if (recetaId) {
        cargarReceta(recetaId);
    } else {
        console.error('No se encontró un ID de receta válido en la URL.');
    }
});

let cargarReceta = async (id) => {
    try {
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
        <h1>${receta.titulo}</h1>
        <video controls>
            <source src="data:video/mp4;base64,${receta.videoBase64}" type="video/mp4">
            Tu navegador no soporta la reproducción de videos.
        </video>
        <p>${receta.descripcion}</p>
    `;
};
