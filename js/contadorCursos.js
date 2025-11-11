import { BuscadorElementos } from "./BuscadorELementos.js";
const DOM = new BuscadorElementos();

export function inicializadorContador() {
    const courseCounter = DOM.oneElement(".cart-count");
    const sidebarCounter = DOM.oneElement(".cart-count-sidebar");
    const emptyCart = DOM.oneElement(".delete-cart-count");
    const cartTable = DOM.oneElement("#cart-items");

    let count = sessionStorage.getItem("courseCounter");

    if (count) {
        count = parseInt(count);
    } else {
        count = 0;
    }

    courseCounter.textContent = count;
    sidebarCounter.textContent = count;

    //Funcion del contador
    document.body.addEventListener("click", (evento) => {
        const boton = evento.target
        if (boton.classList.contains("buy-course")) {
            count++;
            courseCounter.textContent = count;
            sidebarCounter.textContent = count;
            sessionStorage.setItem("courseCounter", count);
        }
    });

    //Para vaciar el carrito
    emptyCart.addEventListener("click", () => {
        count = 0;
        courseCounter.textContent = "0";
        sidebarCounter.textContent = "0";
        sessionStorage.removeItem("courseCounter");

        cartTable.innerHTML = "";
    })

}