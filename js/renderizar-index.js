import { cursosData } from './cursos-data.js';

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
});
