export class BuscadorElementos{

    unElemento(selector){
        return document.querySelector(selector)
    }

    mElementos(selector){
        return document.querySelectorAll(selector);
    }

    obtenerValor(selector){
        const elemento = document.querySelector(selector);
        return elemento ? elemento.value.trim(): "";
    }

    cambiarTexto(selector, nuevoTexto){
        const elemento = document.querySelector(selector);
        if(elemento) elemento.textContent = nuevoTexto;
    }

}
