document.addEventListener('DOMContentLoaded', function() {
    const profilePicContainer = document.querySelector('.profile-pic-container');
    const profilePicInput = document.getElementById('foto');
    const profilePic = document.getElementById('profilePic');
    const form = document.querySelector('.form');
    const urlParams = new URLSearchParams(window.location.search);
    const clienteId = urlParams.get('id');

    if (clienteId) {
        cargarCliente(clienteId);
    }

    profilePicContainer.addEventListener('click', function() {
        profilePicInput.click();
    });

    profilePicInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePic.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        guardarCambios(clienteId);
    });
});

async function cargarCliente(id) {
    try {
        const respuesta = await fetch(`http://localhost:3398/api/cliente/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error(`HTTP error! status: ${respuesta.status}`);
        }

        const cliente = await respuesta.json();
        document.getElementById('nombre').value = cliente.nombre;
        document.getElementById('correo').value = cliente.correo;
        document.getElementById('sexo').value = cliente.sexo;
        document.getElementById('peso').value = cliente.peso;
        document.getElementById('altura').value = cliente.altura;
        if (cliente.imagenBase64) {
            document.getElementById('profilePic').src = `data:image/jpeg;base64,${cliente.imagenBase64}`;
        }
    } catch (error) {
        console.error('Error cargando cliente:', error);
    }
}

async function guardarCambios(id) {
    const formData = new FormData();
    formData.append('nombre', document.getElementById('nombre').value);
    formData.append('correo', document.getElementById('correo').value);
    formData.append('sexo', document.getElementById('sexo').value);
    formData.append('peso', document.getElementById('peso').value);
    formData.append('altura', document.getElementById('altura').value);
    const fileInput = document.getElementById('foto');
    if (fileInput.files.length > 0) {
        formData.append('foto', fileInput.files[0]);
    }

    try {
        const respuesta = await fetch(`http://localhost:3398/api/cliente/${id}`, {
            method: 'PUT',
            body: formData
        });

        if (!respuesta.ok) {
            throw new Error(`HTTP error! status: ${respuesta.status}`);
        }

        alert('Cambios guardados exitosamente');
    } catch (error) {
        console.error('Error guardando cambios:', error);
        alert('Error guardando cambios');
    }
}
