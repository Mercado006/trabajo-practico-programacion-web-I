const USERS_KEY = "skillup_users"; // Clave para la "tabla" de usuarios
const CART_KEY = "skillup_cart";   // Clave para la "tabla" del carrito
const SESSION_KEY = "currentUser"; // Clave para la sesión actual

// --- Funciones de Usuarios ---


export function getUsersDB() {
    const usersJSON = localStorage.getItem(USERS_KEY);
    return usersJSON ? JSON.parse(usersJSON) : [];
}


export function saveUsersDB(usersArray) {
    localStorage.setItem(USERS_KEY, JSON.stringify(usersArray));
}

// --- Funciones de Sesión (SessionStorage) ---

export function setCurrentUser(email) {
    sessionStorage.setItem(SESSION_KEY, email);
}


export function getCurrentUser() {
    return sessionStorage.getItem(SESSION_KEY);
}


export function logoutUser() {
    sessionStorage.removeItem(SESSION_KEY);
}

// --- Funciones del Carrito ---

export function getCartDB() {
    const cartJSON = localStorage.getItem(CART_KEY);
    return cartJSON ? JSON.parse(cartJSON) : [];
}

export function saveCartDB(cartArray) {
    localStorage.setItem(CART_KEY, JSON.stringify(cartArray));
}