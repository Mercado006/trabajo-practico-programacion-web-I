export function showError(id, message) {
    const inputElement = document.getElementById(id);
    const errorElement = document.getElementById(`error-${id}`);
    const campoElement = inputElement.closest('.campo');

    if (errorElement) {
        errorElement.innerText = message;
        errorElement.style.display = 'block';
    }
    if (campoElement) {
        campoElement.classList.add('error');
    }
}

export function clearError(id) {
    const inputElement = document.getElementById(id);
    const errorElement = document.getElementById(`error-${id}`);
    const campoElement = inputElement.closest('.campo');

    if (errorElement) {
        errorElement.innerText = '';
        errorElement.style.display = 'none';
    }
    if (campoElement) {
        campoElement.classList.remove('error');
    }
}

export function showSuccessPopup() {
    const overlay = document.createElement('div');
    overlay.className = 'success-overlay';

    const messageBox = document.createElement('div');
    messageBox.className = 'success-message';
    
    messageBox.innerHTML = '<h3 style="color: rgb(2, 48, 71); margin-bottom: 0.5em;">Consulta enviada</h3><p>Gracias por contactarnos. Te responderemos a la brevedad.</p><button class="close-btn" id="popup-close-btn">Aceptar</button>';

    overlay.appendChild(messageBox);
    document.body.appendChild(overlay);

    const closeBtn = document.getElementById('popup-close-btn');
    closeBtn.addEventListener('click', () => {
        window.location.href = '../index.html';
    });
}