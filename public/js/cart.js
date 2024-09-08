import { getCart, saveCart } from "../helpers/cart.js";
import bookServices, { getBookItem } from "../services/bookServices.js";

let bookCache = {}; // Biến để lưu trữ thông tin sách

function updateCartItemQuantity(bookId, delta) {
    const cart = getCart();
    const index = cart.findIndex(item => item.id === bookId);

    if (index !== -1) {
        cart[index].quantity += delta;

        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }

        saveCart(cart);
        loadCart(); // Tải lại giỏ hàng sau khi cập nhật
    }
}

async function loadCart() {
    const cart = getCart();
    const cartItemsContainer = $('#cart-items');
    cartItemsContainer.empty();

    if (cart.length === 0) {
        cartItemsContainer.append('<p>Your cart is empty.</p>');
        return;
    }

    // Nếu chưa có sách trong cache, tải danh sách sách
    if (Object.keys(bookCache).length === 0) {
        const books = await bookServices.getBooks();
        books.forEach(book => {
            bookCache[book.id] = book;
        });
    }

    cart.forEach(item => {
        const book = bookCache[item.id]; // Lấy thông tin sách từ cache

        const cartItemHTML = `
            <div class="cart-item" data-cart-id="${book.id}">
                <img src="${book.image}" alt="${book.title}">
                <h3>${book.title}</h3>
                <div class="quantity-controls">
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                </div>
            </div>`;
        cartItemsContainer.append(cartItemHTML);
    });
}

export default {
    init: function() {
        loadCart();
        $('.cart-container').on('click', '.decrease-quantity', function() {
            const bookId = $(this).data('id');
            updateCartItemQuantity(bookId, -1);
        });

        $('.cart-container').on('click', '.increase-quantity', function() {
            const bookId = $(this).data('id');
            updateCartItemQuantity(bookId, 1);
        });
        $('.cart-container').on('click', '#checkout', function() {
            alert('Checkout feature is not implemented yet.');
        });
    }
}