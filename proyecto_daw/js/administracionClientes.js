document.addEventListener('DOMContentLoaded', function() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            const script = document.createElement('script');
            script.src = 'js/header.js';
            document.body.appendChild(script);
        });

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });

    fetchClientes();
});

function fetchClientes() {
    fetch('http://localhost:3398/api/clientes')
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data)) {
                throw new Error('Invalid data format');
            }
            const tbody = document.querySelector('.users-table tbody');
            tbody.innerHTML = '';
            data.forEach(cliente => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${cliente.id}</td>
                    <td>${cliente.nombre}</td>
                    <td>${cliente.correo}</td>
                    <td>${cliente.sexo}</td>
                    <td>${cliente.altura}</td>
                    <td>${cliente.peso}</td>
                    <td>
                        <button class="btn edit-button" onclick="editCliente(${cliente.id})">✏️</button>
                        <button class="btn delete-button" onclick="deleteCliente(${cliente.id})">🗑️</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error fetching clientes:', error);
        });
}

function editCliente(id) {
    window.location.href = `editarCliente.html?id=${id}`;
}

function deleteCliente(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
        fetch(`http://localhost:3398/api/clientes/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Cliente eliminado correctamente');
                fetchClientes();
            } else {
                throw new Error('Error al eliminar el cliente');
            }
        })
        .catch(error => {
            console.error('Error eliminando cliente:', error);
            alert('Error eliminando cliente');
        });
    }
}
