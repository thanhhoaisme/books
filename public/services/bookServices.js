
const getBookItem = (id) => bookServices.books.find(c => c.id === id);
const getCategoryItem =  (id) => bookServices.categories.find(c => c.id === id);
const bookServices = {
    categories: [],
    books: [],
    getCategories: () => fetch('/categories').then(response => response.json()),
    getBooks: (query = '') => fetch(`/books?${query}`).then(response => response.json()),
    getBookDetail: id => fetch(`/books/${id}`).then(response => response.json()),
}

export default bookServices;
export {
    getBookItem,
    getCategoryItem,
}