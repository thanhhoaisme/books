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

                // Xử lý sự kiện click vào nút "Edit"
                $('.edit-book').click(function() {
                    const id = $(this).data('id');
                    // Lấy thông tin sách từ server hoặc từ nơi bạn lưu trữ dữ liệu
                    bookServices.getBookDetail(id)
                        .then(book => {
                            // Hiển thị form chỉnh sửa với thông tin sách
                            const editFormHTML = `
                                <form id="edit-book-form">
                                    <input type="hidden" name="id" value="${book.id}">
                                    <label for="edit-title">Title:</label>
                                    <input type="text" id="edit-title" name="title" value="${book.title}"><br>

                                    <label for="edit-description">Description:</label>
                                    <textarea id="edit-description" name="description">${book.description}</textarea><br>

                                    <label for="edit-price">Price:</label>
                                    <input type="number" id="edit-price" name="price" value="${book.price}"><br>

                                    <label for="edit-stock_quantity">Stock Quantity:</label>
                                    <input type="number" id="edit-stock_quantity" name="stock_quantity" value="${book.stock_quantity}"><br>

                                    <label for="edit-image">Image URL:</label>
                                    <input type="text" id="edit-image" name="image" value="${book.image}"><br>

                                    <button type="submit">Save Changes</button>
                                </form>
                            `;

                            // Thay thế nội dung của phần hiển thị sách bằng form chỉnh sửa
                            $(this).closest('.book-item').html(editFormHTML);

                            // Xử lý submit form chỉnh sửa
                            $('#edit-book-form').submit(function(event) {
                                event.preventDefault();
                                const formData = $(this).serializeArray();
                                const updatedBookData = {};
                                formData.forEach(item => updatedBookData[item.name] = item.value);

                                const token = localStorage.getItem('token');
                                if (!token) {
                                    alert('Bạn cần đăng nhập để thực hiện thao tác này.');
                                    return; // Dừng việc gửi yêu cầu nếu không có token
                                }

                                // Gửi yêu cầu cập nhật sách đến server (bao gồm token trong header)
                                fetch(`/api/admin/books/${book.id}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer ' + token 
                                    },
                                    body: JSON.stringify(updatedBookData)
                                })
                                .then(response => {
                                    if (response.ok) {
                                        // ...
                                    } else if (response.status === 401) {
                                        localStorage.removeItem('token');
                                        // Ẩn các phần nội dung yêu cầu xác thực
                                        $('#admin-books').hide(); 
                                        $('#admin-cart').hide(); 
                                        // Hiển thị thông báo yêu cầu đăng nhập
                                        alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
                                        window.location.hash = '#login'; // Chuyển hướng đến trang đăng nhập
                                    } else {
                                        // Xử lý các lỗi khác
                                        console.error('Error updating book:', response.statusText);
                                        alert('Cập nhật sách không thành công!');
                                    }
                                })
                                .catch(error => {
                                    console.error('Error updating book:', error);
                                    alert('Đã xảy ra lỗi. Vui lòng thử lại.');
                                });
                            });
                        })
                        .catch(error => console.error('Error loading book details:', error));
                });

                // Xử lý sự kiện click vào nút "Delete" (nếu cần)
                $('.delete-book').click(function() {
                    const id = $(this).data('id');
                    // Handle delete book logic
                });

            })
            .catch(error => console.error('Error loading books:', error));
    }

    // ... (Các phần khác của file admin.js)
}

export default {
    init,
}   