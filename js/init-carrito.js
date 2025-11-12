import { getCurrentUser, getCartItems, addItemToCart, removeItemFromCart } from './almacenamiento.js';

export function inicializarCarrito() {
  const currentUser = getCurrentUser();
  const items = getCartItems(currentUser);
  const contador = items.reduce((total, item) => total + item.cantidad, 0);
  
  actualizarContadorDOM(contador);
}

export function incrementarCarrito() {
  const currentUser = getCurrentUser();
  const items = getCartItems(currentUser);
  const contador = items.reduce((total, item) => total + item.cantidad, 0);
  
  actualizarContadorDOM(contador);
  return contador;
}

export function decrementarCarrito() {
  const currentUser = getCurrentUser();
  const items = getCartItems(currentUser);
  const contador = items.reduce((total, item) => total + item.cantidad, 0);
  
  actualizarContadorDOM(contador);
  return contador;
}

export function actualizarContadorCarrito() {
  const currentUser = getCurrentUser();
  const items = getCartItems(currentUser);
  const contador = items.reduce((total, item) => total + item.cantidad, 0);
  
  actualizarContadorDOM(contador);
  return contador;
}

function actualizarContadorDOM(valor) {
  // Contador para el carrito del header
  const contadorElemento = document.querySelector('.cart-count');
  if (contadorElemento) {
    contadorElemento.textContent = valor;
  }

  // Contador para el sidebar
  const contadorSidebar = document.querySelector('.cart-count-sidebar');
  if (contadorSidebar) {
    contadorSidebar.textContent = valor;
  }
}

// Inicializar cuando se carga el DOM
document.addEventListener('DOMContentLoaded', () => {
  inicializarCarrito();
});