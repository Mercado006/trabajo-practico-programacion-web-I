import { BuscadorElementos } from "../BuscadorELementos.js";
const DOM = new BuscadorElementos();

export function inicializarSidebar() {
  
  const cartButton = DOM.idElement("cart-button");
  const cartSidebar = DOM.idElement("cart-sidebar");
  const closeButton = DOM.idElement("close-cart")

function toggleCart(){
    if(cartSidebar.classList.contains("open")){
        cartSidebar.classList.remove("open");
    } else { 
        cartSidebar.classList.add("open");
    }
}

cartButton.addEventListener("click", toggleCart);
closeButton.addEventListener("click", toggleCart);



}