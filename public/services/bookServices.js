const getBookItem = (id) => bookServices.books.find(c => c.id === id);
const getCategoryItem =  (id) => bookServices.categories.find(c => c.id === id);

const bookServices = {
    categories: [],
    books: [],

    // Sử dụng async/await để xử lý promise một cách đồng bộ hơn
    async getCategories() {
        if (this.categories.length === 0) { // Chỉ tải nếu chưa có dữ liệu
            const response = await fetch('/categories');
            this.categories = await response.json();
        }
        return this.categories;
    },

    async getBooks(query = '') {
        if (this.books.length === 0 && query === '') { // Chỉ tải tất cả sách nếu chưa có và không có query
            const response = await fetch(`/books?${query}`);
            this.books = await response.json();
        } else if (query !== '') { // Nếu có query, luôn tải lại từ server
            const response = await fetch(`/books?${query}`);
            return await response.json(); 
        }
        return this.books;
    },

    async getBookDetail(id) {
        const response = await fetch(`/books/${id}`);
        return await response.json();
    },
}

export default bookServices;
export { getBookItem, getCategoryItem };