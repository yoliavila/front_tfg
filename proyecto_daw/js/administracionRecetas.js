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

    fetchRecetas();
});

function fetchRecetas() {
    fetch('http://localhost:3398/api/admin/recetas')
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data)) {
                throw new Error('Invalid data format');
            }
            const tbody = document.querySelector('.recipes-table tbody');
            tbody.innerHTML = '';
            data.forEach(receta => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${receta.id}</td>
                    <td>${receta.titulo}</td>
                    <td>${receta.resumen}</td>
                    <td>${receta.descripcion}</td>
                    <td>
                        <button class="btn edit-button" onclick="editReceta(${receta.id})">✏️</button>
                        <button class="btn delete-button" onclick="deleteReceta(${receta.id})">🗑️</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error fetching recetas:', error);
        });
}

function editReceta(id) {
    // Implementa la lógica de edición
    window.location.href = `editarReceta.html?id=${id}`;
}

function deleteReceta(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta receta?')) {
        fetch(`http://localhost:3398/api/admin/recetas/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Receta eliminada correctamente');
                fetchRecetas();
            } else {
                throw new Error('Error al eliminar la receta');
            }
        })
        .catch(error => {
            console.error('Error eliminando receta:', error);
            alert('Error eliminando receta');
        });
    }
}
