import { cursosData } from './cursos-data.js';
import { mostrarModal } from './modal-carrito.js';
import { guardarCarrito, leerCarrito } from './componentes/sidebar.js';
import { inicializarCarrito, incrementarCarrito } from './init-carrito.js'; 

document.addEventListener('DOMContentLoaded', () => {
  inicializarCarrito();
});

const urlParams = new URLSearchParams(window.location.search);
const cursoId = urlParams.get('curso');

if (!cursoId || !cursosData[cursoId]) {
  document.getElementById('curso-main').innerHTML = '<p>Curso no encontrado</p>';
} else {
  const curso = cursosData[cursoId];
  renderizarCurso(curso);
  renderizarCursosRelacionados(curso.cursosRelacionados, cursoId);
  agregarEventosCompra(curso);
}

function renderizarCurso(curso) {
  const main = document.getElementById('curso-main');
  
  main.innerHTML = `
    <section class="curso-section">
      <figure class="curso-img-principal">
        <img src="${curso.imagen}" alt="${curso.titulo}">
      </figure>
      <div class="curso-info">
        <h1>${curso.titulo}</h1>
        <ul class="curso-detalles">
          <li><strong>Valor:</strong> $${curso.precio} ARS.</li>
          <li><strong>Tiempo de dedicación necesario:</strong> ${curso.horas} horas.</li>
        </ul>
        
        ${curso.descripcion ? `
          <details>
            <summary><strong>Descripción del curso</strong></summary>
            ${curso.descripcion.map(p => `<p>${p}</p>`).join('')}
          </details>
        ` : ''}
        
        ${curso.requisitos ? `
          <details>
            <summary><strong>Requisitos previos</strong></summary>
            <ul>
              ${curso.requisitos.map(req => `<li>${req}</li>`).join('')}
            </ul>
          </details>
        ` : ''}
        
        <button class="buy-course">Comprar</button>
        
        ${curso.contenidos ? `
          <div class="curso-contenidos">
            <h2>Contenidos por clase</h2>
            ${curso.contenidos.map(unidad => `
              <details>
                <summary>${unidad.titulo}</summary>
                <ol>
                  ${unidad.temas.map(tema => `<li>${tema}</li>`).join('')}
                </ol>
              </details>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </section>

    ${curso.docente ? `
      <section class="docente-section">
        <h3>Docente</h3>
        <div class="docente-info">
          <figure class="docente-img">
            <img src="${curso.docente.foto}" alt="Foto del docente">
          </figure>
          <div class="docente-desc">
            <h4>${curso.docente.nombre}</h4>
            <img class="docente-califiacion-img" src="${curso.docente.calificacion}" alt="Calificación del docente">
            ${curso.docente.descripcion.map(p => `<p>${p}</p>`).join('')}
          </div>
        </div>
      </section>
    ` : ''}
  `;
}

function renderizarCursosRelacionados(idsRelacionados, cursoActualId) {
  const aside = document.getElementById('cursos-relacionados');
  
  const cursosHTML = idsRelacionados
    .filter(id => id !== cursoActualId)
    .map(id => {
      const curso = cursosData[id];
      if (!curso) return '';
      
      return `
        <article class="curso-tarjeta">
          <figure class="curso-img">
            <img src="${curso.imagen}" alt="Curso de ${curso.titulo}">
            <span class="curso-precio">${curso.precio} ARS</span>
          </figure>
          <div class="curso-tarjeta-info">
            <div class="curso-info-contenido">
              <h5>${curso.titulo}</h5>
              <a href="detalle-curso.html?curso=${id}">Ver Detalle</a>
              <button class="buy-course" data-id="${id}">Comprar</button>
            </div>
            <p class="curso-horas">${curso.horas} hs</p>
          </div>
        </article>
      `;
    })
    .join('');
  
  aside.innerHTML = cursosHTML;
}

function agregarEventosCompra(cursoActual) {
  const botones = document.querySelectorAll('.buy-course');
  botones.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id || cursoActual.id;
      const cursoSeleccionado = cursosData[id] || cursoActual;
      
      // Leer el carrito actual
      let carrito = leerCarrito();
      const existente = carrito.find(c => c.id === cursoSeleccionado.id);

      if (existente) {
        existente.cantidad += 1;
      } else {
        carrito.push({
          id: cursoSeleccionado.id,
          titulo: cursoSeleccionado.titulo,
          precio: cursoSeleccionado.precio,
          imagen: cursoSeleccionado.imagen,
          cantidad: 1
        });
      }

      const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);
      guardarCarrito(carrito, totalUnidades);


      // PRIMERO incrementamos el contador
      incrementarCarrito();
      
      // DESPUÉS mostramos el modal
      mostrarModal(cursoSeleccionado);
    });
  });
}