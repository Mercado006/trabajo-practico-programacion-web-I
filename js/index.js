// Modulado
import { InicializadorSlider } from "./Slider.js";

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar slider si existe
  const sliderWrapper = document.querySelector('.slider-wrapper');
  if (sliderWrapper) {
    InicializadorSlider();
  }
});