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

const guestMenu = document.querySelector('.guest-menu');
const userMenu = document.querySelector('.user-menu');
const adminMenu = document.querySelector('.admin-menu');

if (isAuthenticated) {
    guestMenu.style.display = 'none';
    if (isAdmin) {
        adminMenu.style.display = 'block';
    } else {
        userMenu.style.display = 'block';
    }
} else {
    guestMenu.style.display = 'block';
    userMenu.style.display = 'none';
    adminMenu.style.display = 'none';
}

document.querySelector('.logout').addEventListener('click', () => {
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.setItem('isAdmin', 'false');
    window.location.href = 'login.html';
});
