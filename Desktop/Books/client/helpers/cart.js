// cart.js
const CART_KEY = 'cart';

function getCart() {
    const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    return cart;
}

function calculateCartItems() {
    // Get the cart from localStorage (or from your backend API if applicable)
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Calculate the total number of items by summing up the quantities
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    
    return totalItems;
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    const event = new CustomEvent('cart-updated');
    window.dispatchEvent(event);
}

function addToCart(bookId) {
    const cart = getCart();
    const index = cart.findIndex(item => item.id === bookId);
    
    if (index === -1) {
        cart.push({ id: bookId, quantity: 1 });
    } else {
        cart[index].quantity += 1;
    }

    saveCart(cart);
}

export {
    getCart,
    calculateCartItems,
    addToCart,
    saveCart,
}