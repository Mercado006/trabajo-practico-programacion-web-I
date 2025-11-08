import { BuscadorElementos } from "./BuscadorELementos.js";
const DOM = new BuscadorElementos();


export function inicializadorContador() {
    const contadorCursos = DOM.unElemento(".cart-count");
    const botones = DOM.mElementos(".buy-course");
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
            sessionStorage.setItem("contadorCursos", cantidad)
        });
    });
}
