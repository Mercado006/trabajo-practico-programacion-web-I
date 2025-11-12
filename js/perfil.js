import { getCurrentUser, getUsersDB, deleteUser, logoutUser } from './almacenamiento.js';

document.addEventListener('DOMContentLoaded', () => {
    // Verificar si hay sesión activa
    const currentUserEmail = getCurrentUser();
    
    if (!currentUserEmail) {
        alert('Debes iniciar sesión para ver tu perfil');
        window.location.href = './login.html';
        return;
    }

    // Obtener datos del usuario
    const usersDB = getUsersDB();
    const usuario = usersDB.find(user => user.email === currentUserEmail);

    if (!usuario) {
        alert('Error al cargar el perfil');
        window.location.href = '../index.html';
        return;
    }

    // Mostrar información del usuario
    document.getElementById('usuario-nombre').textContent = usuario.nombre;
    document.getElementById('usuario-email').textContent = usuario.email;

    // Manejar el toggle de la contraseña
    const togglePasswordBtn = document.getElementById('toggle-password');
    const passwordElement = document.getElementById('usuario-password');
    const eyeIcon = document.getElementById('eye-icon');
    let passwordVisible = false;

    togglePasswordBtn.addEventListener('click', () => {
        passwordVisible = !passwordVisible;

        if (passwordVisible) {
            passwordElement.textContent = usuario.pass;
            passwordElement.classList.remove('password-hidden');
            eyeIcon.src = '../img/ojo-abierto.png';
            eyeIcon.alt = 'Ocultar contraseña';
        } else {
            passwordElement.textContent = '••••••••';
            passwordElement.classList.add('password-hidden');
            eyeIcon.src = '../img/ojo-cerrado.png';
            eyeIcon.alt = 'Mostrar contraseña';
        }
    });

    // Manejar eliminación de cuenta (una sola confirmación)
    const eliminarCuentaBtn = document.getElementById('eliminar-cuenta');
    
    eliminarCuentaBtn.addEventListener('click', () => {
        const confirmacion = confirm('¿Estás seguro de que deseas eliminar tu cuenta?');

        if (confirmacion) {
            const eliminado = deleteUser(currentUserEmail);

            if (eliminado) {
                alert('Tu cuenta ha sido eliminada exitosamente.');
                logoutUser();
                window.location.href = '../index.html';
            } else {
                alert('Error al eliminar la cuenta. Por favor, intenta nuevamente.');
            }
        }
    });
});
