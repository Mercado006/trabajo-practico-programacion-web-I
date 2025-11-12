
import { showError, clearError, showSuccessPopup } from '../PaginaContacto/interfazFormulario.js';
import { isNombreValid, isEmailValid, validateTelefono, isConsultaValid } from '../PaginaContacto/validacion.js';

// 2. Esperamos a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {

    // 3. Seleccionamos los elementos
    const form = document.getElementById('contact-form');
    if (form) {
        form.noValidate = true;
    }

    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const telefono = document.getElementById('telefono');
    const consulta = document.getElementById('consulta');
    const consultaCounter = document.getElementById('counter-consulta');
    const maxChars = 1000;


    if (telefono) {
        telefono.addEventListener('blur', () => {
            const validationResult = validateTelefono(telefono); 
            if (validationResult === 'invalid') {
                showError('telefono', 'El teléfono debe tener 8 dígitos numéricos');
            } else {
                clearError('telefono');
            }
        });
    }

    // Contador de caracteres
    if (consulta) {
        consulta.addEventListener('input', () => {
            // (Esta lógica es de UI, podría ir en ui.js también)
            const currentLength = consulta.value.length;
            const remaining = maxChars - currentLength;

            if (remaining >= 0) {
                consultaCounter.innerText = `${remaining} caracteres restantes`;
                consultaCounter.classList.remove('error');
            } else {
                consultaCounter.innerText = `Límite excedido por ${Math.abs(remaining)} caracteres`;
                consultaCounter.classList.add('error');
            }
        });
    }

    // Limpieza de errores en tiempo real
    [nombre, email, consulta].forEach(input => {
        if (input) {
            input.addEventListener('input', () => {
                if (input.value.trim() !== '') { 
                    clearError(input.id);
                }
            });
        }
    });

    // Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        clearError('nombre');
        clearError('email');
        clearError('telefono');
        clearError('consulta');
        
        // Validamos 
        const nombreValido = isNombreValid(nombre.value);
        const emailValido = isEmailValid(email.value);
        const telefonoValido = validateTelefono(telefono); // Re-validamos
        const consultaValida = isConsultaValid(consulta.value, maxChars);

        let isFormValid = true; // Bandera

        // Comprobamos los resultados y usamos el módulo de interfaz
        if (!nombreValido) {
            isFormValid = false;
            showError('nombre', 'El nombre y apellido son obligatorios.');
        }

        if (emailValido === 'empty') {
            isFormValid = false;
            showError('email', 'El correo electrónico es obligatorio.');
        } else if (emailValido === false) {
            isFormValid = false;
            showError('email', 'Por favor, ingresa un correo electrónico válido.');
        }
        
        if (telefonoValido === 'invalid') {
            isFormValid = false;
            showError('telefono', 'El teléfono debe tener 8 dígitos numéricos');
        }

        if (consultaValida === 'empty') {
            isFormValid = false;
            showError('consulta', 'Por favor, escriba su consulta.');
        } else if (consultaValida === 'too_long') {
            isFormValid = false;
            showError('consulta', `La consulta no puede exceder los ${maxChars} caracteres.`);
        }

        if (isFormValid) {
            console.log('Formulario válido. Mostrando popup...');
            showSuccessPopup(); 
            form.reset();
            if (consultaCounter) {
                consultaCounter.innerText = `${maxChars} caracteres restantes`;
                consultaCounter.classList.remove('error');
            }
        }
    });
});