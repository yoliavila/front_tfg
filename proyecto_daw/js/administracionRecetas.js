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
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const tbody = document.querySelector('.recetas-table tbody');
            tbody.innerHTML = '';
            if (Array.isArray(data)) {
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
            } else {
                console.error('Response is not an array:', data);
            }
        })
        .catch(error => {
            console.error('Error fetching recetas:', error);
        });
}

function editReceta(id) {
    // Implementa la lógica de edición
    console.log('Edit receta', id);
}

function deleteReceta(id) {
    // Implementa la lógica de eliminación
    console.log('Delete receta', id);
}
