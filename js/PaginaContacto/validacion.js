export function isNombreValid(nombre) {
    return nombre.trim() !== '';
}

export function isEmailValid(email) {
    if (email.trim() === '') return 'empty'; 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

export function validateTelefono(telefonoElement) {
    const phoneValue = telefonoElement.value.trim();
    if (phoneValue === '') {
        return 'valid'; // Es válido porque es opcional
    }

    const cleanedPhoneValue = phoneValue.replace(/-/g, '');
    const phoneRegex = /^\d{8}$/;

    if (!phoneRegex.test(cleanedPhoneValue)) {
        return 'invalid'; 
    }
    
    // Si es válido, formateamos el valor en el elemento
    telefonoElement.value = cleanedPhoneValue.substring(0, 4) + '-' + cleanedPhoneValue.substring(4);
    return 'valid';
}

export function isConsultaValid(consulta, maxChars) {
    if (consulta.trim() === '') return 'empty';
    if (consulta.length > maxChars) return 'too_long';
    return 'valid';
}