import { getCurrentUser, getCartCount, incrementCartCount, decrementCartCount } from './almacenamiento.js';

export function inicializarCarrito() {
  const currentUser = getCurrentUser();
  
  // Si no hay usuario logueado, mostrar 0
  if (!currentUser) {
    actualizarContadorDOM(0);
    return;
  }
  
  // Obtener el contador del carrito del usuario actual
  const contador = getCartCount(currentUser);
  actualizarContadorDOM(contador);
}

export function incrementarCarrito() {
  const currentUser = getCurrentUser();
  
  if (!currentUser) {
    console.warn('No hay usuario logueado');
    return 0;
  }
  
  const nuevoContador = incrementCartCount(currentUser);
  actualizarContadorDOM(nuevoContador);
  return nuevoContador;
}

export function decrementarCarrito() {
  const currentUser = getCurrentUser();
  
  if (!currentUser) {
    console.warn('No hay usuario logueado');
    return 0;
  }
  
  const nuevoContador = decrementCartCount(currentUser);
  actualizarContadorDOM(nuevoContador);
  return nuevoContador;
}

function actualizarContadorDOM(valor) {
  const contadorElemento = document.querySelector('.cart-count');
  if (contadorElemento) {
    contadorElemento.textContent = valor;
  }
}

// Inicializar cuando se carga el DOM
document.addEventListener('DOMContentLoaded', () => {
  inicializarCarrito();
});