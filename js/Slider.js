import { BuscadorElementos } from "./BuscadorELementos.js";
const DOM = new BuscadorElementos();

export function InicializadorSlider() {
    const slider = DOM.unElemento(".slider");
    const leftArrow = DOM.unElemento(".left-arrow-btn");
    const rightArrow = DOM.unElemento(".right-arrow-btn");
    const cards = buscador.mElementos(".slider-card");

    let currentIndex = 0;
    const visibleCards = 2;
    const totalCards = cards.length;
    const cardWidth = cards[0].offsetWidth + 32;

    function actualizarSlider() {
        const desplazamiento = -(currentIndex * cardWidth);
        slider.style.transform = `translateX(${desplazamiento}px)`;
        slider.style.transition = "transform 0.8s ease";
    }

      rightArrow.addEventListener("click", () => {
        if (currentIndex < totalCards - visibleCards) {
            currentIndex++;
            actualizarSlider();
        }
    });

      leftArrow.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            actualizarSlider();
        }
    });




}