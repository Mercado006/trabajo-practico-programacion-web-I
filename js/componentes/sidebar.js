import { inicializarCarrito } from "../init-carrito.js";
import { getCurrentUser } from "../almacenamiento.js";

export function guardarCarrito(items, count) {
  const currentUser = getCurrentUser();
  if (currentUser) {
    localStorage.setItem(`cart_items_${currentUser}`, JSON.stringify(items));
    localStorage.setItem(`cart_count_${currentUser}`, count.toString());
  } else {
    localStorage.setItem("guest_cart_items", JSON.stringify(items));
    localStorage.setItem("guest_cart_count", count.toString());
  }
}

export function leerCarrito() {
  const currentUser = getCurrentUser();
  if (currentUser) {
    return JSON.parse(localStorage.getItem(`cart_items_${currentUser}`) || "[]");
  } else {
    return JSON.parse(localStorage.getItem("guest_cart_items") || "[]");
  }
}

export function inicializarSidebar() {
  const cartBtn = document.getElementById("cart-button");
  const cartSidebar = document.getElementById("cart-sidebar");
  const closeBtn = document.getElementById("close-cart");
  const emptyCartBtn = document.getElementById("delete-cart-count");
  const cartItems = document.getElementById("cart-items");

  function toggleCart() {
    if (cartSidebar.classList.contains("open")) {
      cartSidebar.classList.remove("open");
    } else {
      cartSidebar.classList.add("open");
      renderizarSidebar();
    }
  }

  function vaciarCarrito() {
    guardarCarrito([], 0);
    cartItems.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center;">Todavía no se obtuvieron cursos</td>
      </tr>
    `;
    inicializarCarrito();
  }

  function renderizarSidebar() {
    const carrito = leerCarrito();
    cartItems.innerHTML = "";

    if (carrito.length === 0) {
      cartItems.innerHTML = `
        <tr>
          <td colspan="5" style="text-align:center;">Todavía no se obtuvieron cursos</td>
        </tr>
      `;
      return;
    }

    carrito.forEach(curso => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td><img src="${curso.imagen}" alt="${curso.titulo}" width="50"></td>
        <td>${curso.titulo}</td>
        <td>$${curso.precio}</td>
        <td>${curso.cantidad}</td>
        <td><button class="eliminar-curso" data-id="${curso.id}">❌</button></td>
      `;
      cartItems.appendChild(fila);
    });
  }

  function eliminarCurso(id) {
    let carrito = leerCarrito();
    carrito = carrito.filter(c => String(c.id) !== String(id));
    const totalUnidades = carrito.reduce((acc, item) => acc + (item.cantidad || 0), 0);
    guardarCarrito(carrito, totalUnidades);
    renderizarSidebar();
    inicializarCarrito();
  }

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("eliminar-curso")) {
      const id = e.target.dataset.id;
      eliminarCurso(id);
    }
  });

  cartBtn.addEventListener("click", toggleCart);
  closeBtn.addEventListener("click", toggleCart);
  emptyCartBtn.addEventListener("click", vaciarCarrito);
}