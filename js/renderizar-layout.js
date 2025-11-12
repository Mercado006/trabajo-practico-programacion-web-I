import { headerHTML } from './componentes/header.js';
import { footerHTML } from './componentes/footer.js';
import { inicializarSidebar } from './componentes/sidebar.js';

// Renderizar header
const headerContainer = document.getElementById('header');
if (headerContainer) {
  headerContainer.innerHTML = headerHTML;
}

// Renderizar footer
const footerContainer = document.getElementById('footer');
if (footerContainer) {
  footerContainer.innerHTML = footerHTML;
}

// Inicializar sidebar después de que el header esté renderizado
document.addEventListener('DOMContentLoaded', () => {
  // Pequeño delay para asegurar que todo el DOM esté listo
  setTimeout(() => {
    inicializarSidebar();
    actualizarEstadoUsuario();
  }, 0);
});

// Función para actualizar el estado del usuario en el header
function actualizarEstadoUsuario() {
  const authButton = document.getElementById('auth-button');
  const perfilMenuItem = document.getElementById('perfil-menu-item');
  const currentUser = localStorage.getItem('currentUser');
  
  if (currentUser && authButton) {
    authButton.textContent = 'Cerrar sesión';
    authButton.href = '#';
    authButton.onclick = (e) => {
      e.preventDefault();
      localStorage.removeItem('currentUser');
      window.location.href = '/index.html';
    };
    
    if (perfilMenuItem) {
      perfilMenuItem.style.display = 'block';
    }
  }
}