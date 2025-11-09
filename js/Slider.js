import { BuscadorElementos } from "./BuscadorELementos.js";
const DOM = new BuscadorElementos();

export function InicializadorSlider() {
    const slider = DOM.unElemento(".slider");
    const cards = DOM.mElementos(".slider-card");
    const leftArrow = DOM.unElemento(".left-arrow-btn");
    const rightArrow = DOM.unElemento(".right-arrow-btn");
    const dotsContainer = DOM.unElemento(".slider-indicators");
    const dots = DOM.mElementos(".dot");

    if (!slider || cards.length === 0 || !leftArrow || !rightArrow || !dotsContainer) return;

    let index = 0;
    const totalCards = cards.length;
    const visibles = 2;
    const posiciones = Math.max(1, totalCards - visibles + 1); // cantidad de "posiciones" / puntitos
    let intervalo;

    // Mueve el slider según la posición actual
    function actualizarSlider() {
        const desplazamiento = -(index * (cards[0].offsetWidth + 20));
        slider.style.transform = `translateX(${desplazamiento}px)`;
        slider.style.transition = "transform 0.8s ease";
    }

    // Muestra la siguiente tarjeta
    function siguiente() {
        if (index < tarjetasNoVisibles) {
            index++;
        } else {
            index = 0; // vuelve al inicio
        }
        actualizarSlider();
    }

    // Muestra la siguiente tarjeta
    function anterior() {
        if (index > 0) {
            index--;
        } else {
            index = tarjetasNoVisibles;
        }
        actualizarSlider();
    }

    // 🔹 Al hacer clic en un punto, ir a esa tarjeta
    rightArrow.addEventListener("click", () => {
        siguiente();
        reiniciarIntervalo();
    });

    leftArrow.addEventListener("click", () => {
        anterior();
        reiniciarIntervalo();
    });

    function reiniciarIntervalo() {
        clearInterval(intervalo);
        intervalo = setInterval(siguiente, 4000); // 4 segundos
    }

    reiniciarIntervalo();

    //dots lpm
    for (let i = 0; i < totalCards; i++) {
        const punto = DOM.unElemento("span");
        punto.classList.add("dot");
        if (i === 0) punto.classList.add("activo");
        contenedorPuntos.appendChild(punto);
        // cuando se hace clic en un puntito
        punto.addEventListener("click", () => {
            index = i;
            actualizarSlider();
            actualizarPuntos();
            reiniciarIntervalo();
        });

    }

    function actualizarPuntos() {
        puntos.forEach((p, i) => {
            p.classList.toggle("activo", i === index);
        });
    }

}