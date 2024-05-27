document.addEventListener('DOMContentLoaded', (event) => {
    let boton = document.querySelector(".submit-button");
    boton.addEventListener("click", (evento) => {
        evento.preventDefault();  // Evita el envío del formulario por defecto
        registrarRecordatorio();
    });
});

let registrarRecordatorio = async () => {
    let campos = {};

    campos.titulo = document.getElementById("titulo").value;
    campos.fechaVencimiento = document.getElementById("fechaVencimiento").value;

    console.log('Datos a enviar:', JSON.stringify(campos)); // Logging de los datos a enviar

    try {
        const peticion = await fetch("http://localhost:3398/api/registrarRecordatorios", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(campos)
        });

        if (!peticion.ok) {
            throw new Error(`HTTP error! status: ${peticion.status}`);
        }

        const respuesta = await peticion.json();
        console.log('Recordatorio registrado:', respuesta);
    } catch (error) {
        console.error('Error registrando recordatorio:', error);
    }
};
