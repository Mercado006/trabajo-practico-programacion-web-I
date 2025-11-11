const CART_KEY = 'contadorCarrito';

export function inicializarCarrito() {
  const contadorGuardado = parseInt(sessionStorage.getItem(CART_KEY)) || 0;
  actualizarContadorDOM(contadorGuardado);
}

export function incrementarCarrito() {
  let contador = parseInt(sessionStorage.getItem(CART_KEY)) || 0;
  contador++;
  sessionStorage.setItem(CART_KEY, contador);
  actualizarContadorDOM(contador);
}

export function decrementarCarrito() {
  let contador = parseInt(sessionStorage.getItem(CART_KEY)) || 0;
  if (contador > 0) contador--;
  sessionStorage.setItem(CART_KEY, contador);
  actualizarContadorDOM(contador);
}

function actualizarContadorDOM(valor) {
  const contadorElemento = document.querySelector('.cart-count');
  if (contadorElemento) {
    contadorElemento.textContent = valor;
  }
}
