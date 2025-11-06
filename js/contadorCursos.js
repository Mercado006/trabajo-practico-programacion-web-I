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
        });
    });
}