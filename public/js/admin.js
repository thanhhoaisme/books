import bookServices from "../services/bookServices.js";

function init() {
    function loadBooks() {
        bookServices.getBooks()
            .then(books => {
                const booksList = $('#books-list');
                booksList.empty();

                books.forEach(book => {
                    const bookHTML = `
                        <div class="book-item">
                            <img src="${book.image}" alt="${book.title}">
                            <h3>${book.title}</h3>
                            <p>${book.description}</p>
                            <p>$${book.price}</p>
                            <button class="edit-book" data-id="${book.id}">Edit</button>
                            <button class="delete-book" data-id="${book.id}">Delete</button>
                        </div>`;
                    booksList.append(bookHTML);
                });

                // Attach event handlers for edit and delete buttons
                $('.edit-book').click(function() {
                    const id = $(this).data('id');
                    // Handle edit book logic
                });

                $('.delete-book').click(function() {
                    const id = $(this).data('id');
                    // Handle delete book logic
                });
            })
            .catch(error => console.error('Error loading books:', error));
    }

    // Load cart items
    function loadCart() {
        fetch('/api/cart')
            .then(response => response.json())
            .then(cartItems => {
                const cartItemsDiv = $('#cart-items');
                cartItemsDiv.empty();

                cartItems.forEach(item => {
                    const cartItemHTML = `
                        <div class="cart-item">
                            <img src="${item.book.image}" alt="${item.book.title}">
                            <h3>${item.book.title}</h3>
                            <p>Quantity: ${item.quantity}</p>
                            <p>Total: $${item.totalPrice}</p>
                        </div>`;
                    cartItemsDiv.append(cartItemHTML);
                });
            })
            .catch(error => console.error('Error loading cart:', error));
    }

    // Show section based on navigation
    function showSection(sectionId) {
        $('.admin-section').hide();
        $(sectionId).show();
    }

    // Handle navigation
    $('#manage-books').click(function() {
        showSection('#admin-books');
        loadBooks();
    });

    $('#view-cart').click(function() {
        showSection('#admin-cart');
        loadCart();
    });

    // Initial load
    showSection('#admin-books');
    loadBooks();
}

export default {
    init,
}