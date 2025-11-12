import { decrementarCarrito } from './init-carrito.js'; 

export function mostrarModal(curso) {
  const modalExistente = document.querySelector('.modal');
  if (modalExistente) modalExistente.remove();

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <h2>Curso agregado exitosamente</h2>
      <div class="modal-curso-info">
        <img src="${curso.imagen}" alt="${curso.titulo}">
        <div class="modal-detalles">
          <p><strong>${curso.titulo}</strong></p>
          <p>Precio: $${curso.precio} ARS</p>
          <p>Duración: ${curso.horas} horas</p>
        </div>
      </div>
      <button class="modal-ok">Aceptar</button>
      <button class="modal-eliminar-curso">Eliminar curso</button>
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
    decrementarCarrito(); 
    modal.remove();      
  };
}
