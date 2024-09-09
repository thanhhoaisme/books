const getBookItem = (id) => bookServices.books.find(c => c.id === id);
const getCategoryItem =  (id) => bookServices.categories.find(c => c.id === id);
const bookServices = {
    categories: [],
    books: [],
    getCategories: () => fetch('/api/categories').then(response => response.json()),
    getBooks: (query = '') => fetch(`/api/books?${query}`).then(response => response.json()),
    getBookDetail: id => fetch(`/api/books/${id}`).then(response => response.json()),
    addBook: data => {
        const token = localStorage.getItem('token');
        return fetch('/api/books', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: data,
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.error || 'Lỗi khi thêm sách');
                });
            }
            return response.json(); 
        })
        .catch(error => {
            // Xử lý lỗi ở đây nếu cần, ví dụ:
            console.error('Error adding book:', error);
            // Hoặc bạn có thể ném lỗi lên cho component gọi đến xử lý:
            throw error; 
        });
    },
    editBook: data => {
        const token = localStorage.getItem('token');
        return fetch(`/api/books/${data.get('id')}`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` },
            body: data
        }).then(response => response.json())
    },
    deleteBook: (id) => {
        const token = localStorage.getItem('token');
        return fetch(`/api/books/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
        }).then(response => response.json())
    }
}

export default bookServices;
export {
    getBookItem,
    getCategoryItem,
}