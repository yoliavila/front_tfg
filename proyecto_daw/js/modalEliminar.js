    document.querySelector('.delete-button').addEventListener('click', () => {
        fetch('modalEliminar.html')
            .then(response => response.text())
            .then(data => {
                document.body.insertAdjacentHTML('beforeend', data);
                const modal = document.getElementById("deleteModal");
                modal.style.display = "flex";

                const closeModal = document.getElementById("closeModal");
                const cancelDelete = document.getElementById("cancelDelete");
                const confirmDelete = document.getElementById("confirmDelete");

                // Función para ocultar el modal
                function hideModal() {
                    console.log("hola")
                    modal.style.display = "none";
                    modal.parentNode.removeChild(modal);
                    console.log("adios")
                }

                closeModal.addEventListener('click', hideModal);
                cancelDelete.addEventListener('click', hideModal);
                confirmDelete.addEventListener('click', () => {
                    // Lógica para eliminar el elemento
                    hideModal();
                });

                // Ocultar el modal si se hace clic fuera de él
                window.addEventListener('click', (event) => {
                    if (event.target === modal) {
                        hideModal();
                    }
                });
            })
            .catch(err => console.error('Error loading modal:', err));
    });

