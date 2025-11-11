export const headerHTML = `
<header>
    <nav>
        <a href="/index.html" class="logo">
            <img src="/img/logo skillup.png" alt="SkillUp">
        </a>

        <form class="search-form" action="#" method="get">
            <div class="search-wrapper">
                <img src="/img/lupa.png" alt="Buscar" class="search-icon">
                <input type="search" list="cursos" name="q" placeholder="Buscar cursos" autocomplete="off">
                <datalist id="cursos">
                    <option value="UX/UI"></option>
                    <option value="JavaScript"></option>
                    <option value="Python"></option>
                    <option value="Marketing digital"></option>
                </datalist>
            </div>
        </form>

        <ul class="menu">
            <li><a href="/index.html">Inicio</a></li>
            <li><a href="/pages/Calendario.html">Cursos</a></li>
            <li><a href="/pages/formulario-inscripcion.html">Empresas</a></li>
            <li><a href="/pages/PaginaContacto.html">Contacto</a></li>
        </ul>

        <div class="nav-actions">
            <a href="/pages/login.html" class="login">Acceder</a>
            <a href="/pages/formulario-inscripcion.html" class="cart">
                <img src="/img/carrito.png" alt="Carrito de cursos">
                <span class="cart-count">0</span>
            </a>
        </div>
    </nav>
</header>
`;
