    const searchIcon = document.querySelector('.search-icon .icon');
    const searchInput = document.querySelector('.search-input');
    const menuIcon = document.querySelector('.menu-icon .icon');
    const sidebar = document.querySelector('.sidebar');
    const body = document.querySelector('body');


    searchIcon.addEventListener('click', () => {
        console.log('Has pulsado el boton');
        searchInput.classList.toggle('show-search-input');
        console.log('Barra de búsqueda');
    });

    menuIcon.addEventListener('click', () => {
        sidebar.classList.toggle('show-sidebar');
        body.style.overflow = sidebar.classList.contains('show-sidebar') ? 'hidden' : '';
    });

    window.addEventListener('click', (event) => {
        if (!event.target.closest('.sidebar') && !event.target.closest('.menu-icon')) {
            if (sidebar.classList.contains('show-sidebar')) {
                sidebar.classList.remove('show-sidebar');
                body.style.overflow = '';
            }
        }
    });

    const isAuthenticated = false;

    if (isAuthenticated) {
        document.querySelector('.guest-menu').style.display = 'none';
        document.querySelector('.user-menu').style.display = 'block';
    } else {
        document.querySelector('.guest-menu').style.display = 'block';
        document.querySelector('.user-menu').style.display = 'none';
    }

