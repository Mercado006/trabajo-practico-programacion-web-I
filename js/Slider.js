import { BuscadorElementos } from "./BuscadorELementos.js";
const DOM = new BuscadorElementos();

export function InicializadorSlider() {
    const sliderWrapper = DOM.oneElement(".slider-wrapper");
    const slides = DOM.allElement(".slider-card");
    const dots = DOM.allElement(".dot");
    const leftArrow = DOM.oneElement(".left-arrow-btn");
    const rightArrow = DOM.oneElement(".right-arrow-btn");

    let currentIndex = 0;
    const totalSlides = slides.length;
    const interval = 4000;
    let autoSlide;

    function showSlide(index) {
        if (index < 0) {
            currentIndex = totalSlides - 1;
        } else if (index >= totalSlides) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        const offset = -currentIndex * slides[0].offsetWidth;
        sliderWrapper.style.transform = `translateX(${offset}px)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });
    }

    leftArrow.addEventListener("click", () => {
        showSlide(currentIndex - 1);
        resetAutoSlide();
    });

    rightArrow.addEventListener("click", () => {
        showSlide(currentIndex + 1);
        resetAutoSlide();
    });

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            showSlide(i);
            resetAutoSlide();
        });
    });

    function startAutoSlide() {
        autoSlide = setInterval(() => {
            showSlide(currentIndex + 1);
        }, interval);
    }

    function resetAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }

    showSlide(currentIndex);
    startAutoSlide();
}