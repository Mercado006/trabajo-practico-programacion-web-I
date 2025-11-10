    document.addEventListener('DOMContentLoaded', () => { 

    const previewCard = document.getElementById('preview-card');
    const previewTextContainer = document.getElementById('preview-text-container');
    const previewName = document.getElementById('preview-name');
    const previewAmount = document.getElementById('preview-amount');

    const inputName = document.getElementById('destinatario');
    const selectFontSize = document.getElementById('font-size');
    const inputMontoOtro = document.getElementById('monto-otro');
    
    const radioColors = document.querySelectorAll('input[name="color"]');
    const radioMontos = document.querySelectorAll('input[name="monto"]');
    const radioUbicaciones = document.querySelectorAll('input[name="ubicacion"]');
    const radioFondos = document.querySelectorAll('input[name="fondo"]');

    // lógica para el nombre de destinatario
    if (inputName) {
        inputName.addEventListener('input', () => {
            if (inputName.value.trim() === '') {
                // Si está vacío, ponemos un texto de ejemplo
                previewName.innerText = '...';
            } else {
                // Si tiene texto, lo mostramos
                previewName.innerText = `${inputName.value}`;
            }
        });
    }

    // lógica para el color de texto

    if (radioColors.length > 0 && previewName && previewAmount) {
        radioColors.forEach(radio => {
            radio.addEventListener('change', () => {
                const checkedColor = document.querySelector('input[name="color"]:checked').value;
                previewName.style.color = checkedColor;
                previewAmount.style.color = checkedColor;
            });
        });
    }

    // lógica para el tamaño de la fuente

    if (selectFontSize) {
        selectFontSize.addEventListener('change', () => {
            const newSize = selectFontSize.value;
            if (previewName) {
                previewName.style.fontSize = newSize;
            }
            
            const numericSize = parseInt(newSize.replace('px', ''));
            if (previewAmount) {
                previewAmount.style.fontSize = `${numericSize * 1.6}px`;
            }
        });
    }

    // lógica para monto

    function actualizarMonto() {
        const checkedMonto = document.querySelector('input[name="monto"]:checked');
        if (!checkedMonto) return; 

        const value = checkedMonto.value;

        if (value === 'other') {
            const otroMonto = inputMontoOtro ? inputMontoOtro.value : '0';
            if (previewAmount) {
                previewAmount.innerText = otroMonto ? `$${otroMonto}` : '$0';
            }
        } else {
            if (previewAmount) {
                previewAmount.innerText = checkedMonto.dataset.amount;
            }
        }
    }

    if (radioMontos.length > 0) {
        radioMontos.forEach(radio => radio.addEventListener('change', actualizarMonto));
    }

    if (inputMontoOtro) {
        inputMontoOtro.addEventListener('input', actualizarMonto);
    }

    // lógica para ubicación

    if (radioUbicaciones.length > 0 && previewTextContainer) {
        radioUbicaciones.forEach(radio => {
            radio.addEventListener('change', () => {
                const checkedUbicacion = document.querySelector('input[name="ubicacion"]:checked').value;
                
                previewTextContainer.classList.remove(
                    'position-top-left', 
                    'position-top-right', 
                    'position-bottom-left', 
                    'position-bottom-right'
                );
                
                previewTextContainer.classList.add(checkedUbicacion);
            });
        });
    }

    // lógica para el fondo

    if (radioFondos.length > 0 && previewCard) {
        radioFondos.forEach(radio => {
            radio.addEventListener('change', () => {
                const checkedFondo = document.querySelector('input[name="fondo"]:checked').value;
                previewCard.style.backgroundImage = `url('${checkedFondo}')`;
            });
        });
    }

    // Inicialización
    function initializePreview() {

        if (inputName && previewName) {
            if (inputName.value.trim() === '') {
                previewName.innerText = '...';
            } else {
                previewName.innerText = `${inputName.value}`;
            }
        }

        const initColorRadio = document.querySelector('input[name="color"]:checked');
        if (initColorRadio && previewName && previewAmount) {
            const initColor = initColorRadio.value;
            previewName.style.color = initColor;
            previewAmount.style.color = initColor;
        }

        if (selectFontSize && previewName && previewAmount) {
            const initFontSize = selectFontSize.value;
            previewName.style.fontSize = initFontSize;
            const initNumericSize = parseInt(initFontSize.replace('px', ''));
            previewAmount.style.fontSize = `${initNumericSize * 1.6}px`;
        }

        actualizarMonto();

        const initUbicacionRadio = document.querySelector('input[name="ubicacion"]:checked');
        if (initUbicacionRadio && previewTextContainer) {
            const initUbicacion = initUbicacionRadio.value;

            previewTextContainer.classList.remove(
                'position-top-left', 
                'position-top-right', 
                'position-bottom-left', 
                'position-bottom-right'
            );
            previewTextContainer.classList.add(initUbicacion);
        }

        const initFondoRadio = document.querySelector('input[name="fondo"]:checked');
        if (initFondoRadio && previewCard) {
            const initFondo = initFondoRadio.value;
            previewCard.style.backgroundImage = `url('${initFondo}')`;
        }
    }

    // Ejecutamos la función de inicialización
    initializePreview();
});
