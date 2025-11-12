import { BuscadorElementos } from "./BuscadorELementos.js";
import { MODAL } from "./constantesForm.js";

// ==========================
// 🔹 VARIABLES Y ELEMENTOS
// ==========================
const buscador = new BuscadorElementos();

const form_inscripcion = buscador.oneElement(".js-form-inscripcion");
const botonInscribirse = buscador.oneElement(".js-boton-inscribirse");
const botonAgregar = buscador.oneElement(".js-boton-agregar");
const agregarPersona = buscador.oneElement(".js-agregar-persona");
const precioS = buscador.oneElement(".js-precio");
const filaDeInputs = buscador.oneElement(".js-row-contenedor");
const sectionBase = buscador.oneElement(".js-section-empresa");
const botonRestar = buscador.oneElement(".js-dlt-btn");
const montoFijo = buscador.oneElement(".js-monto");
const botonPersonal = buscador.oneElement(".js-boton-personal");
const botonEmpresa = buscador.oneElement(".js-boton-empresa");
const sectionEmpresa = buscador.oneElement(".js-section-empresa");
const sectionPersonal = buscador.oneElement(".js-section-personal");
const titulo = buscador.oneElement(".js-titulo");
const ulModal = buscador.oneElement(".js-ul-modal");
const mensajeModal = buscador.oneElement(".js-modal");
const cierreModal = buscador.oneElement(".js-cierre-modal");

let montoFijoNum = Number(montoFijo.textContent);
const MONTO_FIJO = 20;

// ==========================
// 🔹 FUNCIONES REUTILIZABLES
// ==========================
function limpiarInputs(fila) {
  const inputs = fila.querySelectorAll(".subcontenedor input");
  inputs.forEach((input) => (input.value = ""));
}

function actualizarMonto(accion) {
  if (accion === "sumar") montoFijoNum += MONTO_FIJO;
  else if (accion === "restar" && montoFijoNum > MONTO_FIJO)
    montoFijoNum -= MONTO_FIJO;

  montoFijo.textContent = montoFijoNum;
}

// ==========================
// 🔹 AGREGAR FILA
// ==========================
botonAgregar.addEventListener("click", (evento) => {
  evento.preventDefault();

  const nuevaFila = filaDeInputs.cloneNode(true);
  limpiarInputs(nuevaFila);
  sectionBase.appendChild(nuevaFila);
  actualizarMonto("sumar");
});

// ==========================
// 🔹 ELIMINAR FILA
// ==========================
sectionBase.addEventListener("click", (evento) => {
  if (!evento.target.classList.contains("js-dlt-btn")) return;
  evento.preventDefault();

  const cantidadFilas = buscador.allElement(".js-row-contenedor").length;
  const fila = evento.target.closest(".js-row-contenedor");

  if (fila && cantidadFilas > 1) {
    fila.remove();
    actualizarMonto("restar");
  } else {
    limpiarInputs(fila);
  }
});

// ==========================
// 🔹 CAMBIAR ENTRE MODOS
// ==========================
botonPersonal.addEventListener("click", (evento) => {
  evento.preventDefault();

  sectionEmpresa.style.display = "none";
  sectionPersonal.style.display = "flex";
  agregarPersona.style.display = "none";
  precioS.style.display = "none";
  titulo.style.paddingTop = "0.3em";
});

botonEmpresa.addEventListener("click", (evento) => {
  evento.preventDefault();

  sectionEmpresa.style.display = "flex";
  sectionPersonal.style.display = "none";
  agregarPersona.style.display = "flex";
  precioS.style.display = "flex";
  titulo.style.paddingTop = "0.8em";
});

// ==========================
// 🔹 INSCRIBIRSE / MODAL
// ==========================
botonInscribirse.addEventListener("click", (evento) => {
  evento.preventDefault();

  // Verifica que los campos requeridos estén completos
  if (!form_inscripcion.checkValidity()) {
    form_inscripcion.reportValidity(); // fuerza los mensajes de error del navegador
    console.log("Completar los campos");
    return;
  }

  // Vaciar el contenido previo del modal antes de generar uno nuevo
  ulModal.innerHTML = "";

  // Recorre todas las filas de la empresa
  const filas = buscador.allElement(".js-row-contenedor");

  filas.forEach((fila) => {
    const inputs = fila.querySelectorAll("input");

    // Crea una lista para cada input y muestra su valor junto al nombre del campo
    inputs.forEach((input, i) => {
      const li = document.createElement("li");
      const p = document.createElement("p");

      // ✅ backticks para usar las variables dentro del texto
      p.textContent = `${MODAL[i]}: ${input.value}`;

      li.appendChild(p);
      ulModal.appendChild(li);
    });
  });

  // Muestra el modal en pantalla
  mensajeModal.style.display = "flex";
});

// ==========================
// 🔹 CERRAR MODAL
// ==========================
cierreModal.addEventListener("click", (evento) => {
  evento.preventDefault();
  mensajeModal.style.display = "none";
});
