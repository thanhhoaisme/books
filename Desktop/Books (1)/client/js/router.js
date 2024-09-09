import { getUserInfo } from "../helpers/auth.js";
import { loadPartial, getHashParam } from '../helpers/helpers.js';

const init = () => {
    const hash = window.location.hash || '#home';
    if (hash.match(/^#book-detail/)) {
        const id = getHashParam('id');
        if (id) {
            loadPartial('bookDetail');
        }
    } else if (hash.match(/^#book-list/)) {
        loadPartial('bookList');
    } else if (hash.match(/^#admin/)){
        const user = getUserInfo();
        if(user?.role === 'admin') {
            loadPartial('admin')
        } else {
            location.hash = '#home';
        }
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
            default:
                loadPartial('home');
        }
    }
};

export default { init }