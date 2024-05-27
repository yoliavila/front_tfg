
    // Función para adjuntar eventos al modal de éxito
    function attachSuccessModalEvents() {
        const successModal = document.getElementById("successModal");
        const closeSuccessModal = document.getElementById("closeSuccessModal");
        const okButton = document.getElementById("okButton");

        // Función para mostrar el modal
        function showSuccessModal() {
            successModal.style.display = "flex";
        }

        // Función para ocultar el modal
        function hideSuccessModal() {
            successModal.style.display = "none";
        }

        // Ocultar el modal cuando se haga clic en (x)
        closeSuccessModal.addEventListener('click', hideSuccessModal);

        // Ocultar el modal cuando se haga clic en OK
        okButton.addEventListener('click', hideSuccessModal);

        // Ocultar el modal si se hace clic fuera de él
        window.addEventListener('click', (event) => {
            if (event.target === successModal) {
                hideSuccessModal();
            }
        });

        // Mostrar el modal de éxito al hacer clic en el botón de guardar
        // Esta es una simulación para mostrar cómo se puede llamar
        document.querySelector('.edit-button').addEventListener('click', () => {
            showSuccessModal();
        });
    }

    // Cargar el modal de éxito cuando sea necesario
    // Aquí estoy cargándolo directamente para demostración, pero puedes cargarlo en el evento deseado
    loadSuccessModal();
