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

    fetchRutinas();
});

function fetchRutinas() {
    fetch('http://localhost:3398/api/admin/rutinas')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('.routines-table tbody');
            tbody.innerHTML = '';
            data.forEach(rutina => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${rutina.id}</td>
                    <td>${rutina.titulo}</td>
                    <td>${rutina.resumen}</td>
                    <td>${rutina.descripcion}</td>
                    <td>${rutina.nombreEntrenador}</td>
                    <td>
                        <button class="btn edit-button" onclick="editRutina(${rutina.id})">✏️</button>
                        <button class="btn delete-button" onclick="deleteRutina(${rutina.id})">🗑️</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error fetching rutinas:', error);
        });
}

function editRutina(id) {
    // Implementa la lógica de edición
    console.log('Edit rutina', id);
}

function deleteRutina(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta rutina?')) {
        fetch(`http://localhost:3398/api/admin/rutinas/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Rutina eliminada correctamente');
                fetchRutinas();
            } else {
                throw new Error('Error al eliminar la rutina');
            }
        })
        .catch(error => {
            console.error('Error eliminando rutina:', error);
            alert('Error eliminando rutina');
        });
    }}
