document.addEventListener('DOMContentLoaded', (event) => {
    let boton = document.querySelector(".submit-button");
    boton.addEventListener("click", (evento) => {
        evento.preventDefault();  // Evita el envío del formulario por defecto
        registrarReceta();
    });
});

let registrarReceta = async () => {
    let campos = {};

    campos.titulo = document.getElementById("titulo").value;
    campos.resumen = document.getElementById("resumen").value;
    campos.descripcion = document.getElementById("descripcion").value;

    try {
        const peticion = await fetch("http://localhost:3398/api/registrarRecetas", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campos)
        });

        if (!peticion.ok) {
            throw new Error(`HTTP error! status: ${peticion.status}`);
        }

        const respuesta = await peticion.json();
        console.log('Receta registrada:', respuesta);
    } catch (error) {
        console.error('Error registrando receta:', error);
    }
};
