// cart.js
const CART_KEY = 'cart';

function getCart() {
    const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    return cart;
}

function calculateCartItems() {
    const cart = getCart();

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return totalItems;
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cart-updated'));
}

async function addToCart(bookId) {
    const token = localStorage.getItem('token');

    try {
        if (!token) {
            throw new Error('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.');
        }

        const response = await fetch('/cart', { // Sửa đường dẫn API ở đây
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ bookId, quantity: 1 })
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Lỗi khi thêm vào giỏ hàng');
        }

        const updatedCartItem = await response.json();
        const cart = getCart();

        // Sửa lỗi: Tìm kiếm dựa trên book_id thay vì id
        const existingItemIndex = cart.findIndex(item => item.book_id === bookId);

        if (existingItemIndex === -1) {
            cart.push(updatedCartItem);
        } else {
            cart[existingItemIndex].quantity = updatedCartItem.quantity;
        }

        saveCart(cart);
        loadCart(); 
    } catch (error) {
        console.error('Error adding to cart:', error);
        alert(error.message);
    }
}

export {
    getCart,
    calculateCartItems,
    addToCart,
    saveCart,
};