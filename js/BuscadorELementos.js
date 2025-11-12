export class BuscadorElementos {

    oneElement(selector) {
        return document.querySelector(selector);
    }

    allElement(selector) {
        return document.querySelectorAll(selector);
    }

    getValue(selector) {
        const element = document.querySelector(selector);
        return element ? element.value.trim() : "";
    }

    changeText(selector, newText) {
        const element = document.querySelector(selector);
        if (element) element.textContent = newText;
    }

<<<<<<< HEAD
=======
    idElement(selector) {
        return document.getElementById(selector);
    }


>>>>>>> main
}