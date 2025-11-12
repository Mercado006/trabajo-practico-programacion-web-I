import { getCurrentUser, getCartCount, incrementCartCount, decrementCartCount } from './almacenamiento.js';

// Clave para carrito de invitados (sin login)
const GUEST_CART_KEY = 'guest_cart_count';

export function inicializarCarrito() {
  const currentUser = getCurrentUser();
  
  let contador;
  if (currentUser) {
    // Usuario logueado: usar su carrito personal
    contador = getCartCount(currentUser);
  } else {
    // Usuario invitado: usar carrito temporal en localStorage
    contador = parseInt(localStorage.getItem(GUEST_CART_KEY) || '0');
  }
  
  actualizarContadorDOM(contador);
}

export function incrementarCarrito() {
  const currentUser = getCurrentUser();
  let nuevoContador;
  
  if (currentUser) {
    // Usuario logueado
    nuevoContador = incrementCartCount(currentUser);
  } else {
    // Usuario invitado
    const contadorActual = parseInt(localStorage.getItem(GUEST_CART_KEY) || '0');
    nuevoContador = contadorActual + 1;
    localStorage.setItem(GUEST_CART_KEY, nuevoContador.toString());
  }
  
  actualizarContadorDOM(nuevoContador);
  return nuevoContador;
}

export function decrementarCarrito() {
  const currentUser = getCurrentUser();
  let nuevoContador;
  
  if (currentUser) {
    // Usuario logueado
    nuevoContador = decrementCartCount(currentUser);
  } else {
    // Usuario invitado
    const contadorActual = parseInt(localStorage.getItem(GUEST_CART_KEY) || '0');
    nuevoContador = Math.max(0, contadorActual - 1);
    localStorage.setItem(GUEST_CART_KEY, nuevoContador.toString());
  }
  
  actualizarContadorDOM(nuevoContador);
  return nuevoContador;
}

function actualizarContadorDOM(valor) {
  //contador para el carriot del header
  const contadorElemento = document.querySelector('.cart-count');
  if (contadorElemento) {
    contadorElemento.textContent = valor;
  }

  //contador para el sidebar
  const contadorSidebar = document.querySelector('.cart-count-sidebar');
  if (contadorSidebar) {
    contadorSidebar.textContent = valor;
  }
}

// Inicializar cuando se carga el DOM
document.addEventListener('DOMContentLoaded', () => {
  inicializarCarrito();
});