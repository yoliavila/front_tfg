document.addEventListener('DOMContentLoaded', (event) => {
    cargarRecordatorios();

    const addReminderButton = document.getElementById("addReminderButton");
    addReminderButton.addEventListener("click", () => {
        window.location.href = "/proyecto_daw/nuevoRecordatorio.html";
    });

    const enableDeleteModeButton = document.getElementById("enableDeleteModeButton");
    enableDeleteModeButton.addEventListener("click", () => {
        toggleDeleteMode();
    });

    const deleteSelectedButton = document.getElementById("deleteSelectedButton");
    deleteSelectedButton.addEventListener("click", () => {
        eliminarRecordatoriosSeleccionados();
    });
});

let recordatorios = [];
let deleteModeEnabled = false;

let cargarRecordatorios = async () => {
    try {
        const respuesta = await fetch("http://localhost:3398/api/recordatorios", {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error(`HTTP error! status: ${respuesta.status}`);
        }

        recordatorios = await respuesta.json();
        mostrarRecordatorios(recordatorios);
    } catch (error) {
        console.error('Error cargando recordatorios:', error);
    }
};

let mostrarRecordatorios = (recordatorios) => {
    const listaRecordatorios = document.querySelector('.reminders-list');
    listaRecordatorios.innerHTML = ''; // Limpiar la lista antes de agregar los recordatorios

    const fechaActual = new Date();

    recordatorios.forEach(recordatorio => {
        const fechaRecordatorio = new Date(recordatorio.fechaVencimiento);
        const esVencido = fechaRecordatorio < fechaActual;

        const recordatorioElemento = document.createElement('div');
        recordatorioElemento.classList.add('reminder-item');

        recordatorioElemento.innerHTML = `
            <div class="reminder-date">
                <p>${fechaRecordatorio.getDate()}</p>
                <p>${fechaRecordatorio.toLocaleString('default', { month: 'short' }).toUpperCase()}</p>
            </div>
            <div class="reminder-content">
                <h3 class="reminder-title">${recordatorio.titulo} ${esVencido ? '<span class="expired">VENCIDO</span>' : ''}</h3>
                <p class="reminder-description">${recordatorio.descripcion || ''}</p>
                <button class="btn edit-button">Editar</button>
                <button class="btn delete-single-button" data-id="${recordatorio.id}">Borrar</button>
                <input type="checkbox" class="select-checkbox" data-id="${recordatorio.id}" style="display: none;">
            </div>
        `;

        listaRecordatorios.appendChild(recordatorioElemento);
    });

    // Adjuntar eventos de borrado individual
    document.querySelectorAll('.delete-single-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const id = event.target.dataset.id;
            eliminarRecordatorio(id);
        });
    });
};

let toggleDeleteMode = () => {
    deleteModeEnabled = !deleteModeEnabled;

    const checkboxes = document.querySelectorAll('.select-checkbox');
    const deleteActions = document.querySelector('.delete-actions');

    checkboxes.forEach(checkbox => {
        checkbox.style.display = deleteModeEnabled ? 'block' : 'none';
    });

    deleteActions.style.display = deleteModeEnabled ? 'block' : 'none';
};

let eliminarRecordatoriosSeleccionados = async () => {
    const seleccionados = Array.from(document.querySelectorAll('.select-checkbox:checked')).map(checkbox => checkbox.dataset.id);

    try {
        for (let id of seleccionados) {
            await eliminarRecordatorio(id);
        }

        // Recargar los recordatorios después de la eliminación
        cargarRecordatorios();
    } catch (error) {
        console.error('Error eliminando recordatorios:', error);
    }
};

let eliminarRecordatorio = async (id) => {
    try {
        const respuesta = await fetch(`http://localhost:3398/api/borrarRecordatorios/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error(`HTTP error! status: ${respuesta.status}`);
        }

        // Recargar los recordatorios después de la eliminación
        cargarRecordatorios();
    } catch (error) {
        console.error(`Error eliminando recordatorio ${id}:`, error);
    }
};
