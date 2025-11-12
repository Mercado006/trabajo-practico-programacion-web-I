const USERS_KEY = "skillup_users";
const SESSION_KEY = "currentUser";
const GUEST_CART_KEY = "guest_cart";

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
    
    if (updatedUsers.length < usersDB.length) {
        saveUsersDB(updatedUsers);
        localStorage.removeItem(`cart_${email}`);
        return true;
    }
    return false;
}

// --- Funciones de Sesión ---
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
 * Obtiene el carrito completo del usuario o invitado
 */
export function getUserCart(userEmail) {
    const cartKey = userEmail ? `cart_${userEmail}` : GUEST_CART_KEY;
    const cartJSON = localStorage.getItem(cartKey);
    
    if (cartJSON) {
        return JSON.parse(cartJSON);
    }
    
    return { items: [], count: 0 };
}

/**
 * Guarda el carrito del usuario o invitado
 */
export function saveUserCart(userEmail, cartData) {
    const cartKey = userEmail ? `cart_${userEmail}` : GUEST_CART_KEY;
    localStorage.setItem(cartKey, JSON.stringify(cartData));
    return true;
}

/**
 * Obtiene solo el contador del carrito
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
 * Decrementa el contador del carrito en 1
 */
export function decrementCartCount(userEmail) {
    const cart = getUserCart(userEmail);
    cart.count = Math.max(0, (cart.count || 0) - 1);
    saveUserCart(userEmail, cart);
    return cart.count;
}

/**
 * Agrega un item al carrito (curso o giftcard)
 */
export function addItemToCart(userEmail, item) {
    const cart = getUserCart(userEmail);
    
    // Verificar si el item ya existe
    const existingIndex = cart.items.findIndex(i => i.id === item.id);
    
    if (existingIndex > -1) {
        // Si existe, aumentar cantidad
        cart.items[existingIndex].cantidad += 1;
    } else {
        // Si no existe, agregarlo
        cart.items.push({
            ...item,
            cantidad: 1
        });
    }
    
    cart.count = cart.items.reduce((total, item) => total + item.cantidad, 0);
    saveUserCart(userEmail, cart);
    return cart;
}

/**
 * Elimina un item específico del carrito
 */
export function removeItemFromCart(userEmail, itemId) {
    const cart = getUserCart(userEmail);
    cart.items = cart.items.filter(item => item.id !== itemId);
    cart.count = cart.items.reduce((total, item) => total + item.cantidad, 0);
    saveUserCart(userEmail, cart);
    return cart;
}

/**
 * Actualiza la cantidad de un item en el carrito
 */
export function updateItemQuantity(userEmail, itemId, newQuantity) {
    const cart = getUserCart(userEmail);
    const itemIndex = cart.items.findIndex(i => i.id === itemId);
    
    if (itemIndex > -1) {
        if (newQuantity <= 0) {
            cart.items.splice(itemIndex, 1);
        } else {
            cart.items[itemIndex].cantidad = newQuantity;
        }
    }
    
    cart.count = cart.items.reduce((total, item) => total + item.cantidad, 0);
    saveUserCart(userEmail, cart);
    return cart;
}

/**
 * Limpia el carrito del usuario completamente
 */
export function clearUserCart(userEmail) {
    const cartKey = userEmail ? `cart_${userEmail}` : GUEST_CART_KEY;
    const emptyCart = { items: [], count: 0 };
    localStorage.setItem(cartKey, JSON.stringify(emptyCart));
    return true;
}

/**
 * Obtiene todos los items del carrito
 */
export function getCartItems(userEmail) {
    const cart = getUserCart(userEmail);
    return cart.items || [];
}

// --- Funciones VIEJAS (deprecated) ---
export function getCartDB() {
    const cartJSON = localStorage.getItem("skillup_cart");
    return cartJSON ? JSON.parse(cartJSON) : [];
}

export function saveCartDB(cartArray) {
    localStorage.setItem("skillup_cart", JSON.stringify(cartArray));
}