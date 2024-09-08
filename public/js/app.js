import { loadPartial, getHashParam } from '../helpers/helpers.js';
import bookServices from '../services/bookServices.js';

async function fetchPreData()  {
    const categories = await bookServices.getCategories();
    bookServices.categories = categories;
}
$(document).ready(async function()  {
    // Load the home page on initial load
    await fetchPreData();
    loadPartial('header', '#header');

    const router = () => {
        const hash = window.location.hash || '#home';
        if (hash.match(/^#book-detail/)) {
            const id = getHashParam('id');
            if (id) {
                loadPartial('bookDetail');
            }
        } else if (hash.match(/^#book-list/)) {
            loadPartial('bookList');
        } else {
            switch (hash) {
                case '#login':
                    loadPartial('login');
                    break;
                case '#register':
                    loadPartial('register');
                    break;
                case '#home':
                    loadPartial('home');
                    break;
                case '#book-detail':
                    loadPartial('bookDetail');
                    break;
                case '#cart':
                    loadPartial('cart');
                    break;
                case '#admin':
                    loadPartial('admin');
                    break;
                default:
                    loadPartial('home');
            }
        }
    };

    $(window).on('hashchange', router);
    router();
});
