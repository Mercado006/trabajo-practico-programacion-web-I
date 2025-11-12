const USERS_KEY = "skillup_users"; // Clave para la "tabla" de usuarios
const SESSION_KEY = "currentUser"; // Clave para la sesión actual

// --- Funciones de Usuarios ---

export function getUsersDB() {
    const usersJSON = localStorage.getItem(USERS_KEY);
    return usersJSON ? JSON.parse(usersJSON) : [];
}

export function saveUsersDB(usersArray) {
    localStorage.setItem(USERS_KEY, JSON.stringify(usersArray));
}

export function deleteUser(email) {
    const usersDB = getUsersDB();
    const updatedUsers = usersDB.filter(user => user.email !== email);
    
    // Verificar que realmente se eliminó el usuario
    if (updatedUsers.length < usersDB.length) {
        saveUsersDB(updatedUsers);
        
        // También eliminar el carrito del usuario
        localStorage.removeItem(`cart_${email}`);
        
        return true;
    }
    return false;
}

// --- Funciones de Sesión (LocalStorage) ---

export function setCurrentUser(email) {
    localStorage.setItem(SESSION_KEY, email);
}

export function getCurrentUser() {
    return localStorage.getItem(SESSION_KEY);
}

export function logoutUser() {
    localStorage.removeItem(SESSION_KEY);
}

// --- Funciones del Carrito POR USUARIO ---

/**
 * Obtiene el carrito completo del usuario
 * Retorna un objeto con la estructura: { items: [], count: 0 }
 */
export function getUserCart(userEmail) {
    if (!userEmail) return { items: [], count: 0 };
    
    const cartKey = `cart_${userEmail}`;
    const cartJSON = localStorage.getItem(cartKey);
    
    if (cartJSON) {
        return JSON.parse(cartJSON);
    }
    
    // Si no existe, inicializar carrito vacío
    return { items: [], count: 0 };
}

/**
 * Guarda el carrito del usuario
 */
export function saveUserCart(userEmail, cartData) {
    if (!userEmail) return false;
    
    const cartKey = `cart_${userEmail}`;
    localStorage.setItem(cartKey, JSON.stringify(cartData));
    return true;
}

/**
 * Obtiene solo el contador del carrito del usuario
 */
export function getCartCount(userEmail) {
    const cart = getUserCart(userEmail);
    return cart.count || 0;
}

/**
 * Actualiza el contador del carrito
 */
export function updateCartCount(userEmail, newCount) {
    const cart = getUserCart(userEmail);
    cart.count = newCount;
    saveUserCart(userEmail, cart);
}

/**
 * Incrementa el contador del carrito en 1
 */
export function incrementCartCount(userEmail) {
    const cart = getUserCart(userEmail);
    cart.count = (cart.count || 0) + 1;
    saveUserCart(userEmail, cart);
    return cart.count;
}

/**
 * Decrementa el contador del carrito en 1 (mínimo 0)
 */
export function decrementCartCount(userEmail) {
    const cart = getUserCart(userEmail);
    cart.count = Math.max(0, (cart.count || 0) - 1);
    saveUserCart(userEmail, cart);
    return cart.count;
}

/**
 * Limpia el carrito del usuario completamente
 */
export function clearUserCart(userEmail) {
    if (!userEmail) return false;
    
    const cartKey = `cart_${userEmail}`;
    localStorage.removeItem(cartKey);
    return true;
}

// --- Funciones del Carrito VIEJAS (deprecated, mantener por compatibilidad) ---

export function getCartDB() {
    const cartJSON = localStorage.getItem("skillup_cart");
    return cartJSON ? JSON.parse(cartJSON) : [];
}

export function saveCartDB(cartArray) {
    localStorage.setItem("skillup_cart", JSON.stringify(cartArray));
}