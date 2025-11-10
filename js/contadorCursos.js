import { BuscadorElementos } from "./BuscadorELementos.js";
const DOM = new BuscadorElementos();

export function inicializadorContador() {
    const courseCounter = DOM.oneElement(".cart-count");
    const buttons = DOM.allElement(".buy-course");
    let count = sessionStorage.getItem("courseCounter");
    if (count) {
        count = parseInt(count);
    } else {
        count = 0;
    }

    courseCounter.textContent = count;

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            count++;
            courseCounter.textContent = count;

            sessionStorage.setItem("courseCounter", count);
        });
    });
}