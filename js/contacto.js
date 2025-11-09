document.addEventListener('DOMContentLoaded', () =>{

// seleccionar los elementos

const form = document.getElementById('contact-form');

//en caso de que el script falle el html con su required tomará el control, pero sino se carga lo que le decimos 

if (form) {
    form.setAttribute('noValidate', true);
} else {
    console.error ("No se encontró el formulario con id 'contact-form'");
    return;
}

const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const telefono = document.getElementById('telefono');
const consulta = document.getElementById('consulta');

const consultaCounter = document.getElementById('counter-consulta');
const maxChars = 1000;

// funciones de ayuda

function showError (id, message) {
    const inputElement = document.getElementById(id);
    const errorElement = document.getElementById(`error-${id}`);
    const campoElement = inputElement.closest('.campo');

    if (errorElement){
        errorElement.innerText = message;
        errorElement.style.display = 'block';
    }
    if (campoElement){
        campoElement.classList.add('error');
    }
}

// limpiamos el mensaje de error de un campo en específico

function clearError(id){
    const inputElement = document.getElementById(id);
    const errorElement = document.getElementById(`error-${id}`);
    const campoElement = inputElement.closest ('.campo');

    if (errorElement){
        errorElement.innerText = ' ';
        errorElement.style.display = 'none';
    }
    if (campoElement){
        campoElement.classList.remove('error');
    }
}

function clearAllError (){
    const ids = ['nombre', 'email', 'telefono', 'consulta'];
    ids.forEach(clearError);
}

// --- Validar Teléfono ---
    function validateTelefono() {
        const phoneValue = telefono.value.trim();
        
        // Es un campo opcional, si está vacío, está bien.
        if (phoneValue === '') {
            clearError('telefono');
            return true;
        }

        // Limpiamos guiones para la validación
        const cleanedPhoneValue = phoneValue.replace(/-/g, '');
        const phoneRegex = /^\d{8}$/;

        if (!phoneRegex.test(cleanedPhoneValue)) {
            // Es inválido
            showError('telefono', 'El teléfono debe tener 8 dígitos numéricos');
            return false;
        } else {
            // Es válido, lo formateamos y limpiamos error
            telefono.value = cleanedPhoneValue.substring(0, 4) + '-' + cleanedPhoneValue.substring(4);
            clearError('telefono');
            return true;
        }
    }


// contador de caracteres

if (consulta){
    consulta.addEventListener('input', () => {
        const currentLength = consulta.value.length;
        const remaining = maxChars - currentLength;

        if (remaining >= 0) {
            consultaCounter.innerText = `${remaining} caracteres restantes`;
            consultaCounter.classList.remove('error');

            if (currentLength > 0 ){
                clearError('consulta');
            }
        } else {
            consultaCounter.innerText = `Límite excedido por ${Math.abs(remaining)} caracteres`;
            consultaCounter.classList.add('error');
        }
    })
}

// evento blur
if (telefono) {
        telefono.addEventListener('blur', validateTelefono);
    }

//validacion del formulario

form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Limpiamos todos los errores antes de re-validar
        clearAllError();
        
        // Usamos variables 'booleanas' para rastrear la validez
        let isNombreValid = nombre.value.trim() !== '';
        let isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
        let isConsultaValid = consulta.value.trim() !== '' && consulta.value.length <= maxChars;
        
        // Llamamos a nuestra función para validar el teléfono
        let isTelefonoValid = validateTelefono();

        // --- Mostramos errores ---
        
        if (!isNombreValid) {
            showError('nombre', 'El nombre y apellido son obligatorios.');
        }

        if (email.value.trim() === '') {
            showError('email', 'El correo electrónico es obligatorio.');
            isEmailValid = false;
        } else if (!isEmailValid) {
            showError('email', 'Por favor, ingresa un correo electrónico válido.');
        }

        if (consulta.value.trim() === '') {
            showError('consulta', 'Por favor, escriba su consulta.');
            isConsultaValid = false;
        } else if (consulta.value.length > maxChars) {
            showError('consulta', `La consulta no puede exceder los ${maxChars} caracteres.`);
            isConsultaValid = false;
        }

        // --- Envío final ---
        if (isNombreValid && isEmailValid && isConsultaValid && isTelefonoValid) {
            console.log('Formulario válido. Mostrando popup...');
            showSuccessPopup();
            form.reset();
            if (consultaCounter) {
                consultaCounter.innerText = `${maxChars} caracteres restantes`;
                consultaCounter.classList.remove('error');
            }
        }
    });



// muestra el popup

function showSuccessPopup(){

    //overlay
    const overlay = document.createElement('div');
    overlay.className = 'success-overlay';

    // mensaje 

    const messageBox = document.createElement('div');
    messageBox.className = 'success-message';

    messageBox.innerHTML = '<h3 style="color: rgb(2, 48, 71); margin-bottom: 0.5em;">Consulta enviada</h3><p>Gracias por contactarnos. Te responderemos a la brevedad.</p><button class="close-btn" id="popup-close-btn">Aceptar</button>';

    overlay.appendChild(messageBox);
    document.body.appendChild(overlay);

    // evento en el boton de enviar

    const closeBtn = document.getElementById('popup-close-btn');
    closeBtn.addEventListener('click', () =>{
        window.location.href = '../index.html';
    })

}

// limpieza de errores mientras el usuario escribe

    [nombre, email, consulta].forEach(input => {
        if (input) {
            input.addEventListener('input', () => {
                if (input.value.trim() !== '') { 
                    clearError(input.id);
                }
            });
        }
    });

});