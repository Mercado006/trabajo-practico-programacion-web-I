import { getUsersDB, saveUsersDB } from './almacenamiento.js';

document.addEventListener("DOMContentLoaded", () => {

    // Seleccionar los elementos del DOM
    const registroForm = document.querySelector(".login-form");
    const nombreInput = document.getElementById("nombre");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm_password");
    const cardContent = document.querySelector(".card-content");

    // Manejador del formulario
    registroForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita que la página se recargue
        limpiarErrorPrevio();

        // Obtener valores
        const nombre = nombreInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // Validaciones
        if (!nombre || !email || !password || !confirmPassword) {
            mostrarError("Por favor, completa todos los campos.");
            return;
        }
        if (!esEmailValido(email)) {
            mostrarError("Por favor, ingresa un email válido.");
            return;
        }
        if (password.length < 6) {
             mostrarError("La contraseña debe tener al menos 6 caracteres.");
             return;
        }
        if (password !== confirmPassword) {
            mostrarError("Las contraseñas no coinciden.");
            return;
        }

        const usersDB = getUsersDB();
        
        // Verifica si el usuario ya existe
        const usuarioExiste = usersDB.find(user => user.email === email);
        if (usuarioExiste) {
            mostrarError("El email ingresado ya está registrado.");
            return;
        }

        const newUser = {
            nombre: nombre,
            email: email,
            pass: password // Usamos 'pass' para ser consistentes
        };

        // Agregar al array y guardar usando la función importada
        usersDB.push(newUser);
        saveUsersDB(usersDB);

        alert("¡Registro exitoso! Serás redirigido para iniciar sesión.");
        window.location.href = "login.html";
    });


    // --- Funciones Auxiliares (específicas de esta página) ---

    function esEmailValido(email) {
        const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return re.test(String(email).toLowerCase());
    }

    function mostrarError(mensaje) {
        limpiarErrorPrevio();
        const errorElemento = document.createElement("p");
        errorElemento.id = "register-error";
        errorElemento.textContent = mensaje;
        errorElemento.style.color = "red";
        errorElemento.style.textAlign = "center";
        errorElemento.style.fontWeight = "bold";
        errorElemento.style.marginTop = "10px";

        const subtitulo = cardContent.querySelector(".subtitle");
        subtitulo.insertAdjacentElement("afterend", errorElemento);
    }

    function limpiarErrorPrevio() {
        const errorPrevio = document.getElementById("register-error");
        if (errorPrevio) {
            errorPrevio.remove();
        }
    }
});