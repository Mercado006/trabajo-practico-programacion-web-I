export function inicializadorContador() {
    const contadorCursos = document.querySelector(".cart-count");
    const botones = document.querySelectorAll(".buy-course");
    let cantidad = sessionStorage.getItem("contadorCursos");
    if (cantidad) {
        cantidad = parseInt(cantidad);
    } else {
        cantidad = 0;
    }

    contadorCursos.textContent = cantidad;

    botones.forEach((boton) => {
        boton.addEventListener("click", () => {
            cantidad++;
            contadorCursos.textContent = cantidad;

            // Guardamos en sessionStorage
            sessionStorage.setItem("contadorCursos", cantidad);

            mostrarMensaje("Curso agregado al carrito");
            window.scrollTo({ top: 0, behavior: "smooth" });
            animarCarrito(contadorCursos);

        });
    });
}

function mostrarMensaje(texto) {
    const mensaje = document.createElement("div");
    mensaje.textContent = texto;
    mensaje.classList.add("mensaje-carrito");
    document.body.appendChild(mensaje);

    setTimeout(() => {
        mensaje.remove();
    }, 2000);
}

function animarCarrito(elemento) {
    elemento.classList.add("animar");
    setTimeout(() => elemento.classList.remove("animar"), 500);
}
