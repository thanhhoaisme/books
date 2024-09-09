import bookServices from '../services/bookServices.js';

function loadCategories() {
    // Load categories into the select element
    const categorySelect = document.getElementById('category');
    bookServices.categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    }); 
}

function initEvent(cb) {
    const modal = $('#addBookModal');
    const closeModalBtn = $('.add-book-close-btn');
    const addBookForm = document.getElementById('addBookForm');

    // Close modal when close button is clicked
    closeModalBtn.on('click', hideModal);

    // Handle form submission
    addBookForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(addBookForm);

        if(formData.get('id')) {
            bookServices.editBook(formData)
                .then(data => {
                    if (data.success) {
                        alert('Cập nhập thành công!');
                        // Close the modal and refresh the book list
                        hideModal();
                        cb();
                    } else {
                        alert('Cập nhập thất bại');
                    }
                })
            
        } else {
            bookServices.addBook(formData)
                .then(() => {
                    alert('Đã thêm sách thành công');
                    hideModal();
                    cb();
                })
                .catch(error => {
                    console.error('Error adding book:', error);
                });

        }
        // Send book data to the server
    });
}

function init(cb) {
    loadCategories();
    initEvent(cb);
}

function showModal() {
    $('#addBookModal').css('display', 'flex');
}

function hideModal() {
    $('#addBookModal').hide();
    document.getElementById('addBookForm').reset();
}

function createBook() {
    $('#add-book-title').text("Thêm sách");
    $('#btn-submit-book').text("Xác nhận tạo sách");
    $('#currentImageSection').hide();
    document.getElementById('bookId').value = "";
    $('#image').attr('required', true);
    // Thêm dòng này
    document.getElementById('stock_quantity').value = 0; 

    showModal();
}

function editBook(book) {
    $('#add-book-title').text("Chỉnh sửa sách");
    $('#currentImageSection').show();
    $('#btn-submit-book').text("Lưu");
    document.getElementById('bookId').value = book.id;
    document.getElementById('title').value = book.title;
    document.getElementById('description').value = book.description;
    document.getElementById('price').value = book.price;
    document.getElementById('category').value = book.category_id;
    // Thêm dòng này để hiển thị số lượng tồn kho hiện tại
    document.getElementById('stock_quantity').value = book.stock_quantity; 

    $('#image').attr('required', false);

    // Show the current image
    const currentImageElement = document.getElementById('currentImage');
    currentImageElement.src = book.image;
    showModal();
}

export default {
    init,
    createBook,
    editBook,
}