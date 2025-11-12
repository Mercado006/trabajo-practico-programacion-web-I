import { BuscadorElementos } from "../BuscadorELementos.js";
import { 
  getCurrentUser, 
  getCartItems, 
  removeItemFromCart, 
  updateItemQuantity,
  clearUserCart 
} from '../almacenamiento.js';

const DOM = new BuscadorElementos();

// Evento personalizado para actualizar el carrito
const CART_UPDATE_EVENT = 'cartUpdated';

export function inicializarSidebar() {
  const cartButton = DOM.idElement("cart-button");
  const cartSidebar = DOM.idElement("cart-sidebar");
  const closeButton = DOM.idElement("close-cart");
  const deleteCartButton = DOM.idElement("delete-cart-count");

  function toggleCart() {
    if (cartSidebar.classList.contains("open")) {
      cartSidebar.classList.remove("open");
    } else {
      cartSidebar.classList.add("open");
      // Actualizar contenido del carrito al abrir
      renderizarCarrito();
    }
  }

  function renderizarCarrito() {
    const currentUser = getCurrentUser();
    const items = getCartItems(currentUser);
    const tbody = DOM.idElement("cart-items");
    
    // Limpiar contenido anterior
    tbody.innerHTML = '';
    
    if (items.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 20px; color: #666;">
            Tu carrito está vacío
          </td>
        </tr>
      `;
      return;
    }
    
    // Renderizar cada item
    items.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td style="padding: 0.5em;">
          <img src="${item.imagen}" alt="${item.titulo}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;">
        </td>
        <td style="padding: 0.5em; font-size: 0.875em;">${item.titulo}</td>
        <td style="padding: 0.5em; font-size: 0.875em;">$${item.precio}</td>
        <td style="padding: 0.5em;">
          <div style="display: flex; align-items: center; gap: 8px; justify-content: center;">
            <button class="btn-quantity" data-action="decrease" data-id="${item.id}" style="width: 30px; height: 30px; font-size: 16px;">-</button>
            <span style="min-width: 20px; text-align: center;">${item.cantidad}</span>
            <button class="btn-quantity" data-action="increase" data-id="${item.id}" style="width: 30px; height: 30px; font-size: 16px;">+</button>
          </div>
        </td>
        <td style="padding: 0.5em; text-align: center;">
          <button class="btn-remove" data-id="${item.id}" style="font-size: 18px; padding: 5px 10px;">🗑️</button>
        </td>
      `;
      tbody.appendChild(row);
    });
    
    // Agregar event listeners para los botones de cantidad
    const btnQuantity = tbody.querySelectorAll('.btn-quantity');
    btnQuantity.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        const itemId = e.target.dataset.id;
        const currentUser = getCurrentUser();
        const items = getCartItems(currentUser);
        const item = items.find(i => i.id === itemId);
        
        if (item) {
          const newQuantity = action === 'increase' ? item.cantidad + 1 : item.cantidad - 1;
          updateItemQuantity(currentUser, itemId, newQuantity);
          renderizarCarrito();
          actualizarContadorGlobal();
          // Disparar evento de actualización
          window.dispatchEvent(new CustomEvent(CART_UPDATE_EVENT));
        }
      });
    });
    
    // Agregar event listeners para los botones de eliminar
    const btnRemove = tbody.querySelectorAll('.btn-remove');
    btnRemove.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemId = e.target.dataset.id;
        const currentUser = getCurrentUser();
        removeItemFromCart(currentUser, itemId);
        renderizarCarrito();
        actualizarContadorGlobal();
        // Disparar evento de actualización
        window.dispatchEvent(new CustomEvent(CART_UPDATE_EVENT));
      });
    });
  }

  function vaciarCarrito() {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      const currentUser = getCurrentUser();
      clearUserCart(currentUser);
      renderizarCarrito();
      actualizarContadorGlobal();
      // Disparar evento de actualización
      window.dispatchEvent(new CustomEvent(CART_UPDATE_EVENT));
    }
  }

  function actualizarContadorGlobal() {
    const currentUser = getCurrentUser();
    const items = getCartItems(currentUser);
    const totalItems = items.reduce((total, item) => total + item.cantidad, 0);
    
    const contadorElemento = document.querySelector('.cart-count');
    if (contadorElemento) {
      contadorElemento.textContent = totalItems;
    }

    const contadorSidebar = document.querySelector('.cart-count-sidebar');
    if (contadorSidebar) {
      contadorSidebar.textContent = totalItems;
    }
  }

  // Event listeners
  cartButton.addEventListener("click", toggleCart);
  closeButton.addEventListener("click", toggleCart);
  deleteCartButton.addEventListener("click", vaciarCarrito);
  
  // Escuchar evento de actualización del carrito
  window.addEventListener(CART_UPDATE_EVENT, () => {
    // Si el sidebar está abierto, actualizarlo
    if (cartSidebar.classList.contains("open")) {
      renderizarCarrito();
    }
  });
}

// Exportar la función para disparar el evento desde otros módulos
export function notificarActualizacionCarrito() {
  window.dispatchEvent(new CustomEvent(CART_UPDATE_EVENT));
}