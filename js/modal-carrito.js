import { actualizarContadorCarrito } from './init-carrito.js'; 
import { getCurrentUser, updateItemQuantity, getCartItems } from './almacenamiento.js';
import { notificarActualizacionCarrito } from './componentes/sidebar.js';

export function mostrarModal(curso) {
  const modalExistente = document.querySelector('.modal');
  if (modalExistente) modalExistente.remove();

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <h2>Compra agregada exitosamente</h2>
      <div class="modal-curso-info">
        <img src="${curso.imagen}" alt="${curso.titulo}">
        <div class="modal-detalles">
          <p><strong>${curso.titulo}</strong></p>
          <p>Precio: $${curso.precio} ARS</p>
          <p>Duración: ${curso.horas} horas</p>
        </div>
      </div>
      <button class="modal-ok">Aceptar</button>
      <button class="modal-eliminar-curso">Eliminar compra</button>
    </div>
  `;

  document.body.appendChild(modal);

  setTimeout(() => {
    modal.classList.add('visible');
  }, 10);

  modal.querySelector('.close-modal').onclick = () => modal.remove();

  modal.querySelector('.modal-ok').onclick = () => modal.remove();

  modal.onclick = e => {
    if (e.target === modal) modal.remove();
  };

  modal.querySelector('.modal-eliminar-curso').onclick = () => {
    const currentUser = getCurrentUser();
    const items = getCartItems(currentUser);
    const item = items.find(i => i.id === curso.id);
    
    if (item) {
      // Decrementar la cantidad en 1, no eliminar todo el item
      const newQuantity = item.cantidad - 1;
      updateItemQuantity(currentUser, curso.id, newQuantity);
      
      // Actualizar el contador visual
      actualizarContadorCarrito();
      
      // Notificar al sidebar para que se actualice
      notificarActualizacionCarrito();
    }
    
    modal.remove();
  };
}