import { cursosData } from './cursos-data.js';
import { mostrarModal } from './modal-carrito.js';
import { getCurrentUser, addItemToCart } from './almacenamiento.js';
import { actualizarContadorCarrito } from './init-carrito.js';
import { notificarActualizacionCarrito } from './componentes/sidebar.js';

document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.querySelector('.wrapper-courses');
  
  if (!contenedor) return;

  const cursosHTML = Object.values(cursosData)
    .map(curso => `
      <article class="box">
        <img src="${curso.imagen}" alt="${curso.titulo}">
        <h3>${curso.titulo}</h3>
        <p>Duración: ${curso.horas} horas</p>
        <p>Precio: $${curso.precio} ARS</p>
        <div class="wrap-button">
          <a href="./pages/detalle-curso.html?curso=${curso.id}" class="button">Ver detalle</a>
          <button class="buy-course" data-curso-id="${curso.id}">Comprar</button>
        </div>
      </article>
    `)
    .join('');

  contenedor.innerHTML = cursosHTML;

  const botonesComprar = document.querySelectorAll('.buy-course');

  botonesComprar.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cursoId = btn.dataset.cursoId;
      const curso = cursosData[cursoId];
      
      if (!curso) return;
      
      // Crear objeto del item
      const item = {
        id: curso.id,
        tipo: 'curso',
        titulo: curso.titulo,
        precio: curso.precio,
        imagen: curso.imagen,
        horas: curso.horas
      };
      
      // Agregar al carrito
      const currentUser = getCurrentUser();
      addItemToCart(currentUser, item);
      
      // Actualizar contador
      actualizarContadorCarrito();
      
      // Mostrar modal
      mostrarModal(curso);
    });
  });
});