
import { addToCart } from '../helpers/cart.js';
import { getHashParam } from '../helpers/helpers.js';
import bookServices, { getBookItem, getCategoryItem } from '../services/bookServices.js';

async function loadBookDetail(id) {
    const book = await bookServices.getBookDetail(id);

    const category = getCategoryItem(book.category_id);

    $('#book-name').text(book.title);
    $('#book-description').text(book.description);
    $('#book-category').text(`Category: ${category.name}`);
    $('#book-price').text(`Price: $${book.price}`);
    $('#book-image').attr('src', book.image);
}

const init = async () => {
    const id = parseInt(getHashParam('id'));
    if (!id) return;
    await loadBookDetail(id);
    $('#book-detail-add-to-cart').on('click', function() {
        addToCart(id);
    });
}

export default {
    init,
}