import { cursosData } from './cursos-data.js';

const calendarioCursos = {
  '2025-11-06': ['testing', 'python'],
  '2025-11-17': ['sql'],
  '2025-11-22': ['javascript']
};

let fechaActual = new Date(2025, 10, 1); 

document.addEventListener('DOMContentLoaded', () => {
  const calendarGrid = document.getElementById('calendarGrid');
  const nombreDelMes = document.getElementById('nombreDelMes');
  const prevBtn = document.getElementById('prevMonth');
  const nextBtn = document.getElementById('nextMonth');

  function renderCalendar() {
    const anio = fechaActual.getFullYear();
    const mes = fechaActual.getMonth();

    const nombreDelMes = new Intl.DateTimeFormat('es-ES', { mes: 'long' }).format(fechaActual);
    nombreDelMes.textContent = `${nombreDelMes.toUpperCase()} ${anio}`;

    const inicioDelMes = new Date(anio, mes, 1).getDay();
    const diasDelMes = new Date(anio, mes + 1, 0).getDate();

    const cellsToRemove = calendarGrid.querySelectorAll('.calendar-day');
    cellsToRemove.forEach(cell => cell.remove());

    for (let i = 0; i < inicioDelMes; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'calendar-day empty';
      calendarGrid.appendChild(emptyCell);
    }

    for (let day = 1; day <= diasDelMes; day++) {
      const dayCell = document.createElement('div');
      dayCell.className = 'calendar-day';

      const dayNumber = document.createElement('span');
      dayNumber.className = 'day-number';
      dayNumber.textContent = day;
      dayCell.appendChild(dayNumber);

      const today = new Date();
      if (day === today.getDate() && mes === today.getMonth() && anio === today.getFullYear()) {
        dayCell.classList.add('today');
      }

      const dateString = `${anio}-${String(mes + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      if (calendarioCursos[dateString]) {
        dayCell.classList.add('con-cursos');
        
        calendarioCursos[dateString].forEach(cursoId => {
          const curso = cursosData[cursoId];
          
          if (curso) {
            const cursoDiv = document.createElement('div');
            cursoDiv.className = 'curso-tarjeta';
            
            cursoDiv.innerHTML = `
              <a href="detalle-curso.html?curso=${cursoId}" class="curso">${curso.titulo}</a>
              <div class="curso-detalle" style="display: none;">
                <img src="${curso.imagen}" alt="${curso.titulo}">
                <h4>${curso.titulo}</h4>
                <p class="duracion"><strong>Duración:</strong> ${curso.horas} horas</p>
                <p class="descripcion">${curso.descripcion[0]}</p>
                <a href="detalle-curso.html?curso=${cursoId}" class="btn-detalle">Ir al detalle</a>
              </div>
            `;
            
            let hideTimeout;
            const detalleDiv = cursoDiv.querySelector('.curso-detalle');

            cursoDiv.addEventListener('mouseenter', () => {
              clearTimeout(hideTimeout);
              detalleDiv.style.display = 'block';
              detalleDiv.style.zIndex = '100';
            });

            cursoDiv.addEventListener('mouseleave', () => {
              hideTimeout = setTimeout(() => {
                detalleDiv.style.display = 'none';
              }, 500);
            });

            dayCell.appendChild(cursoDiv);
          }
        });
      }

      calendarGrid.appendChild(dayCell);
    }
  }

  prevBtn.addEventListener('click', () => {
    fechaActual.setMonth(fechaActual.getMonth() - 1);
    renderCalendar();
  });

  nextBtn.addEventListener('click', () => {
    fechaActual.setMonth(fechaActual.getMonth() + 1);
    renderCalendar();
  });

  renderCalendar();
});