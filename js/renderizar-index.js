import { cursosData } from './cursos-data.js';
import { mostrarModal } from './modal-carrito.js';
import { guardarCarrito, leerCarrito } from './componentes/sidebar.js';
import { incrementarCarrito } from './carrito.js';

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
          <button class="buy-course">Comprar</button>
        </div>
      </article>
    `)
    .join('');

  contenedor.innerHTML = cursosHTML;

  const botonesComprar = document.querySelectorAll('.buy-course');

  botonesComprar.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const curso = Object.values(cursosData)[index];

      // leer el carrito actual
      let carrito = leerCarrito();

      // buscar si ya existe el curso
      const existente = carrito.find(c => c.id === curso.id);

      if (existente) {
        existente.cantidad += 1;
      } else {
        carrito.push({
          id: curso.id,
          titulo: curso.titulo,
          precio: curso.precio,
          imagen: curso.imagen,
          cantidad: 1
        });
      }
      const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);
      guardarCarrito(carrito, totalUnidades);
      incrementarCarrito();
      mostrarModal(curso);

    });
  });
});
