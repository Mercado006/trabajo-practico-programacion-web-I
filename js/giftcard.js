    document.addEventListener('DOMContentLoaded', () => {

    const previewCard = document.getElementById('preview-card');
    const previewTextContainer = document.getElementById('preview-text-container');
    const previewName = document.getElementById('preview-name');
    const previewAmount = document.getElementById('preview-amount');

    const giftForm = document.getElementById('giftcard-form');
    const inputName = document.getElementById('nombre');
    const selectFontSize = document.getElementById('font-size');
    const inputMontoOtro = document.getElementById('monto-otro');

    const radioColors = document.querySelectorAll('input[name="color"]');
    const radioMontos = document.querySelectorAll('input[name="monto"]');
    const radioUbicaciones = document.querySelectorAll('input[name="ubicacion"]');
    const radioFondos = document.querySelectorAll('input[name="fondo"]');

    
    // VALIDACIÓN ---
    function showError(id, message) {
        const errorElement = document.getElementById(`error-${id}`);
        const groupElement = document.getElementById(`group-${id}`);
        if (errorElement) {
            errorElement.innerText = message;
            errorElement.style.display = 'block';
        }
        if (groupElement) {
            groupElement.classList.add('error');
        }
    }

    function clearError(id) {
        const errorElement = document.getElementById(`error-${id}`);
        const groupElement = document.getElementById(`group-${id}`);
        if (errorElement) {
            errorElement.innerText = '';
            errorElement.style.display = 'none';
        }
        if (groupElement) {
            groupElement.classList.remove('error');
        }
    }

    // LÓGICA PARA NOMBRE DEL DESTINATARIO  ---
    if (inputName && previewName) { 
        inputName.addEventListener('input', () => {
            if (inputName.value.trim() === '') {
                previewName.innerText = 'Para: ...'; // Vuelve al texto por defecto
            } else {
                previewName.innerText = `Para: ${inputName.value}`; // Muestra el texto con prefijo
            }
            clearError('nombre'); 
        });
    }

    // --- LÓGICA PARA COLOR DE TEXTO ---
    if (radioColors.length > 0 && previewName && previewAmount) {
        radioColors.forEach(radio => {
            radio.addEventListener('change', () => {
                const checkedColor = document.querySelector('input[name="color"]:checked').value;
                previewName.style.color = checkedColor;
                previewAmount.style.color = checkedColor;
            });
        });
    }

    // ---  LÓGICA PARA TAMAÑO DE FUENTE  ---
    if (selectFontSize && previewName && previewAmount) { 
        selectFontSize.addEventListener('change', () => {
            const newSize = selectFontSize.value; 
            
            if (previewName) {
                previewName.style.fontSize = newSize;
            }
            
            const numericSize = parseInt(newSize); 
            
            if (previewAmount) {
                previewAmount.style.fontSize = `${numericSize * 1.6}px`;
            }
        });
    }

    // --- LÓGICA PARA MONTO ---
    function actualizarMonto() {
        const checkedMonto = document.querySelector('input[name="monto"]:checked');
        if (!checkedMonto) {
            if (previewAmount) previewAmount.innerText = '$0';
            return;
        }
        const value = checkedMonto.value;
        if (value === 'other') {
            const otroMonto = inputMontoOtro ? inputMontoOtro.value : '0';
            if (previewAmount) {
                previewAmount.innerText = (otroMonto && parseFloat(otroMonto) > 0) ? `$${otroMonto}` : '$0';
            }
        } else {
            if (previewAmount) {
                previewAmount.innerText = checkedMonto.dataset.amount;
            }
        }
    }
    
    if (radioMontos.length > 0) {
        radioMontos.forEach(radio => {
            radio.addEventListener('change', actualizarMonto);
        });
    }
    if (inputMontoOtro) {
        inputMontoOtro.addEventListener('input', actualizarMonto);
        inputMontoOtro.addEventListener('focus', () => {
            document.querySelector('input[name="monto"][value="other"]').checked = true;
            actualizarMonto(); 
        });
    }

    // --- LÓGICA PARA UBICACIÓN ---
    if (radioUbicaciones.length > 0 && previewTextContainer) {
        radioUbicaciones.forEach(radio => {
            radio.addEventListener('change', () => {
                const checkedUbicacion = document.querySelector('input[name="ubicacion"]:checked').value;
                previewTextContainer.classList.remove(
                    'position-top-left', 'position-top-right', 
                    'position-bottom-left', 'position-bottom-right'
                );
                previewTextContainer.classList.add(checkedUbicacion);
            });
        });
    }

    // --- LÓGICA PARA FONDO ---
    if (radioFondos.length > 0 && previewCard) {
        radioFondos.forEach(radio => {
            radio.addEventListener('change', () => {
                const checkedFondo = document.querySelector('input[name="fondo"]:checked').value;
                previewCard.style.backgroundImage = `url('${checkedFondo}')`;
            });
        });
    }
    
    // ---  INICIALIZACIÓN (CORREGIDA) ---
    function initializePreview() {
        // Lógica de nombre unificada
        if (inputName && previewName) {
            if (inputName.value.trim() === '') {
                previewName.innerText = 'Para: ...';
            } else {
                previewName.innerText = `Para: ${inputName.value}`;
            }
        }
        const initColorRadio = document.querySelector('input[name="color"]:checked');
        if (initColorRadio && previewName && previewAmount) {
            previewName.style.color = initColorRadio.value;
            previewAmount.style.color = initColorRadio.value;
        }

        if (selectFontSize && previewName && previewAmount) {
            const initFontSize = selectFontSize.value; 
            previewName.style.fontSize = initFontSize; 
            const initNumericSize = parseInt(initFontSize); 
            previewAmount.style.fontSize = `${initNumericSize * 1.6}px`;
        }

        actualizarMonto();
        const initUbicacionRadio = document.querySelector('input[name="ubicacion"]:checked');
        if (initUbicacionRadio && previewTextContainer) {
            previewTextContainer.classList.add(initUbicacionRadio.value);
        }
        const initFondoRadio = document.querySelector('input[name="fondo"]:checked');
        if (initFondoRadio && previewCard) {
            previewCard.style.backgroundImage = `url('${initFondoRadio.value}')`;
        }
    }
    
    initializePreview(); 

    // --- VALIDACIÓN ---
    function validateForm() {
        clearError('nombre');
        let isValid = true;
        if (!inputName || inputName.value.trim() === '') {
            isValid = false;
            showError('nombre', 'Por favor, ingresa el nombre del destinatario.');
        }
        return isValid;
    }

    // botón "Comprar"
    if (giftForm) {
        giftForm.setAttribute('novalidate', true);

        giftForm.addEventListener('submit', (e) => {
            if (!validateForm()) { 
                e.preventDefault(); 
                console.log('Formulario inválido, "Comprar" detenido.');
            } else {
                console.log('Formulario válido, enviando a "comprar"...');
                
            }
        });
    } else {
        console.error("No se pudo encontrar el formulario con id 'giftcard-form'");
    }

}); 