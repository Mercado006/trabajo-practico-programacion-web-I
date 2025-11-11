import { BuscadorElementos } from "./BuscadorELementos.js";
const DOM = new BuscadorElementos();

export function inicializarSidebar() {
  
  const cartButton = DOM.idElement("cart-button");
  const cartSidebar = DOM.idElement("cart-sidebar");
  const closeButton = DOM.idElement("close-cart")

// Funcion para abrir y cerrar sidebar
function toggleCart(){
    //si el carrito tiene la clase "open", la quitamos
    if(cartSidebar.classList.contains("open")){
        cartSidebar.classList.remove("open");
    } else { 
        //si no la tiene, la agregamos
        cartSidebar.classList.add("open");
    }
}

cartButton.addEventListener("click", toggleCart);
closeButton.addEventListener("click", toggleCart);



}