import bookServices from "../services/bookServices.js";
import addBook from "./addBook.js";

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
                            <button class="edit-book" data-id="${book.id}">Chỉnh sửa</button>
                            <button class="delete-book" data-id="${book.id}">Xoá</button>
                        </div>`;
                    booksList.append(bookHTML);
                });

                // Attach event handlers for edit and delete buttons
                $('.edit-book').click(function() {
                    const id = $(this).data('id');
                    const book = books.find(item => item.id === id);
                    addBook.editBook(book);
                    // Handle edit book logic
                });

                $('.delete-book').click(function() {
                    const id = $(this).data('id');
                    bookServices.deleteBook(id)
                        .then(() => {
                            alert('Đã xoá sách thành công');
                            loadBooks();
                        })
                        .catch(error => console.error('Error deleting book:', error));
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

    // Button to open modal
    $('#add-book-btn').on('click', addBook.createBook);

    $('#add-new-book-form').load('../partials/addBook.html', function() {
        addBook.init(loadBooks);
    });

    // Initial load
    showSection('#admin-books');
    loadBooks();
}

export default {
    init,
}