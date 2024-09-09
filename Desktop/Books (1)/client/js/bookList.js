import { generateBookItem } from "../helpers/books.js";
import { addToCart } from "../helpers/cart.js";
import { getHashParam } from "../helpers/helpers.js";
import bookServices from "../services/bookServices.js";

async function loadBookList() {
    try {
        const category = getHashParam('category');
        const searchStr = getHashParam('searchStr');
        if(!bookServices.books.length) {
            bookServices.books = await bookServices.getBooks();
        }
        let html = '';
        bookServices.books
            .filter(book => {
                if(searchStr && book.title.toLowerCase().indexOf(searchStr.toLowerCase()) === -1) {
                    return false;
                }
                if(category && book.category_id!== parseInt(category)) {
                    return false;
                }
                return true;
            })    
            .forEach(book => {
            html += generateBookItem(book);
        });
        $('#book-list').html(html);
    } catch (err) {
        console.error(err);
    }
}

export default {
    init: function() {
        loadBookList();
        $('#book-list-container').on('click', '.add-to-cart', function() {
            const bookId = $(this).data('id');
            if(!bookId) return;
            addToCart(bookId);
        });
    }
}