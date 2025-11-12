import { headerHTML } from './componentes/header.js';
import { footerHTML } from './componentes/footer.js';
import { inicializarSidebar } from './componentes/sidebar.js';
import { getCurrentUser, logoutUser } from './almacenamiento.js';

document.addEventListener('DOMContentLoaded', () => {
    const headerContainer = document.getElementById('header');
    const footerContainer = document.getElementById('footer');

    if (headerContainer) headerContainer.innerHTML = headerHTML;
    if (footerContainer) footerContainer.innerHTML = footerHTML;
    
    inicializarSidebar();
    actualizarEstadoAutenticacion();
});

function actualizarEstadoAutenticacion() {
    const currentUser = getCurrentUser();
    const authButton = document.getElementById('auth-button');
    const perfilMenuItem = document.getElementById('perfil-menu-item');

    if (currentUser) {
        authButton.textContent = 'Cerrar sesión';
        authButton.href = '#';
        
        if (perfilMenuItem) {
            perfilMenuItem.style.display = 'block';
        }
        
        authButton.addEventListener('click', (e) => {
            e.preventDefault();
            logoutUser();
            alert('Sesión cerrada exitosamente');
            window.location.href = '/index.html';
        });
    } else {
        authButton.textContent = 'Acceder';
        authButton.href = './pages/login.html';
        
        if (perfilMenuItem) {
            perfilMenuItem.style.display = 'none';
        }
    }
}