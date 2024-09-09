import { generateBookItem } from "../helpers/books.js";
import { addToCart } from "../helpers/cart.js";
import bookServices from "../services/bookServices.js";

function init() {
    const content = $('#home-container');
    bookServices.categories.forEach(async category => {
        const home = document.createElement("div");
        $(home).load(`../partials/booksByCategory.html`, async function() {
            const categorySection = $(home).find('.book-list-container').last();
            categorySection.find('.category-title').text(category.name);
            const booksByCategory = await bookServices.getBooks(`category=${category.id}&limit=4`);
            const booksContainer = categorySection.find('.book-list');
            booksByCategory.forEach(book => {
                booksContainer.append(generateBookItem(book));
            });
            content.append(home);
        })
    });
    $('#home-container').on('click', '.add-to-cart', function() {
        const bookId = $(this).data('id');
        if(!bookId) return;
        addToCart(bookId);
    });
}

export default {
    init
}