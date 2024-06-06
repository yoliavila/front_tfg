const searchIcon = document.querySelector('.search-icon .icon');
const searchInput = document.querySelector('.search-input');
const menuIcon = document.querySelector('.menu-icon .icon');
const sidebar = document.querySelector('.sidebar');
const body = document.querySelector('body');

searchIcon.addEventListener('click', () => {
    searchInput.classList.toggle('show-search-input');
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

const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
const isAdmin = localStorage.getItem('isAdmin') === 'true';
const userId = localStorage.getItem('userId');
const clienteId = localStorage.getItem('clienteId');
const username = localStorage.getItem('username');

const guestMenu = document.querySelector('.guest-menu');
const userMenu = document.querySelector('.user-menu');
const adminMenu = document.querySelector('.admin-menu');

if (isAuthenticated) {
    guestMenu.style.display = 'none';
    if (username === 'admin') {
        adminMenu.style.display = 'block';
    } else {
        userMenu.style.display = 'block';
    }

    const editProfileLink = document.getElementById('editProfileLink');
    if (editProfileLink) {
        editProfileLink.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = `editarPerfil.html?id=${clienteId}`;
        });
    }

} else {
    guestMenu.style.display = 'block';
    userMenu.style.display = 'none';
    adminMenu.style.display = 'none';
}

document.querySelectorAll('.logout').forEach(logoutBtn => {
    logoutBtn.addEventListener('click', () => {
        localStorage.setItem('isAuthenticated', 'false');
        localStorage.setItem('isAdmin', 'false');
        localStorage.removeItem('userId');
        localStorage.removeItem('clienteId');
        localStorage.removeItem('username');
        window.location.href = 'login.html';
    });
});

