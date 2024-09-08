import { getCart, saveCart } from "../helpers/cart.js";
import bookServices, { getBookItem, getCategoryItem} from "../services/bookServices.js";

function updateCartItemQuantity(bookId, delta) {
    const cart = getCart();
    const index = cart.findIndex(item => item.id === bookId);
    
    if (index !== -1) {
        cart[index].quantity += delta;

        if (cart[index].quantity <= 0) {
            cart.splice(index, 1); // Remove item if quantity is 0 or less
        }

        saveCart(cart);
        loadCart();
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

    if(!bookServices.books.length) {
        bookServices.books = await bookServices.getBooks();
    }

    cart.forEach(async item => {
        function addCartItem(book) {
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
        }
        let book = getBookItem(item.id);
        if(!book) {
            book = await bookServices.getBooks();
        }
        addCartItem(book);
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