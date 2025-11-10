const cursosData = {
  '2025-11-06': [
    {
      titulo: 'Testing Básico',
      link: '../pages/detalles-del-curso-testing.html',
      img: '../img/curso-testing.png',
      duracion: '35 Horas',
      descripcion: 'Introducción al testing de software y fundamentos esenciales.'
    },
    {
      titulo: 'Introducción a Python',
      link: '../pages/detalles-del-curso-python.html',
      img: '../img/Phyton.jpg',
      duracion: '45 horas',
      descripcion: 'Descubre la sintaxis básica, variables y estructuras de control.'
    }
  ],
  '2025-11-17': [
    {
      titulo: 'SQL Avanzado',
      link: '../pages/detalles-del-curso-sql.html',
      img: '../img/curso-sql-avanzado.png',
      duracion: '60 horas',
      descripcion: 'Técnicas y herramientas para bases de datos complejas.'
    }
  ],
  '2025-11-22': [
    {
      titulo: 'Fundamentos JavaScript',
      link: '../pages/detalles-del-curso-javascript.html',
      img: '../img/curso-intensivo-js.jpg',
      duracion: '50 horas',
      descripcion: 'Introducción completa al lenguaje JavaScript para desarrollo web.'
    }
  ],
};

let currentDate = new Date(2025, 10, 1);

document.addEventListener('DOMContentLoaded', () => {
  const calendarGrid = document.getElementById('calendarGrid');
  const currentMonthDisplay = document.getElementById('currentMonthDisplay');
  const prevBtn = document.getElementById('prevMonth');
  const nextBtn = document.getElementById('nextMonth');

  function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthName = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(currentDate);
    currentMonthDisplay.textContent = `${monthName.toUpperCase()} ${year}`;

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cellsToRemove = calendarGrid.querySelectorAll('.calendar-day');
    cellsToRemove.forEach(cell => cell.remove());

    for (let i = 0; i < firstDayOfMonth; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'calendar-day empty';
      calendarGrid.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayCell = document.createElement('div');
      dayCell.className = 'calendar-day';

      const dayNumber = document.createElement('span');
      dayNumber.className = 'day-number';
      dayNumber.textContent = day;
      dayCell.appendChild(dayNumber);

      const today = new Date();
      if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
        dayCell.classList.add('today');
      }

      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      if (cursosData[dateString]) {
        dayCell.classList.add('con-cursos');
        
        cursosData[dateString].forEach(curso => {
          const cursoDiv = document.createElement('div');
          cursoDiv.className = 'curso-tarjeta';
          
          cursoDiv.innerHTML = `
            <a href="${curso.link}" class="curso">${curso.titulo}</a>
            <div class="curso-detalle" style="display: none;"> <!-- Oculto por defecto con estilo inline para que JS tome el control inicial -->
              <img src="${curso.img}" alt="${curso.titulo}">
              <h4>${curso.titulo}</h4>
              <p class="duracion"><strong>Duración:</strong> ${curso.duracion}</p>
              <p class="descripcion">${curso.descripcion}</p>
              <a href="${curso.link}" class="btn-detalle">Ir al detalle</a>
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
        });
      }

      calendarGrid.appendChild(dayCell);
    }
  }

  prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  renderCalendar();
});