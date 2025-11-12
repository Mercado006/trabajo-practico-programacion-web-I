import { getUsersDB, setCurrentUser } from './almacenamiento.js';

document.addEventListener("DOMContentLoaded", () => {

    // Seleccionar los elementos del DOM
    const loginForm = document.querySelector(".login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const submitButton = loginForm.querySelector("button[type='submit']");
    const cardContent = document.querySelector(".card-content");

    // Manejador del formulario
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita que la página se recargue
        limpiarErrorPrevio();

        // Obtener valores
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (email === "" || password === "") {
            mostrarError("Por favor, completa todos los campos.");
            return;
        }

        // Simular estado de carga
        submitButton.textContent = "Ingresando...";
        submitButton.disabled = true;

        // Simular demora del servidor
        setTimeout(() => {
       
            const usersDB = getUsersDB();

            // Buscar al usuario
            const userFound = usersDB.find(user => user.email === email);

            // Validar credenciales
            if (userFound && userFound.pass === password) {
                
               
                setCurrentUser(userFound.email);
                
               
                window.location.href = "../index.html";

            } else {
                
                mostrarError("Email o contraseña incorrectos.");
            }

            // Restaurar el botón
            submitButton.textContent = "Iniciar sesión";
            submitButton.disabled = false;

        }, 1000); // 1 segundo de demora simulada
    });


    // --- Funciones Auxiliares (Sólo de esta página) ---

    function mostrarError(mensaje) {
        limpiarErrorPrevio();
        const errorElemento = document.createElement("p");
        errorElemento.id = "login-error";
        errorElemento.textContent = mensaje;
        errorElemento.style.color = "red";
        errorElemento.style.textAlign = "center";
        errorElemento.style.fontWeight = "bold";
        errorElemento.style.marginTop = "10px";

        const subtitulo = cardContent.querySelector(".subtitle");
        subtitulo.insertAdjacentElement("afterend", errorElemento);
    }

    function limpiarErrorPrevio() {
        const errorPrevio = document.getElementById("login-error");
        if (errorPrevio) {
            errorPrevio.remove();
        }
    }
});