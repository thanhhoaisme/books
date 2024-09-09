import { loadPartial, getHashParam } from '../helpers/helpers.js';
import bookServices from '../services/bookServices.js';
import router from './router.js';

async function fetchCategories()  {
    const categories = await bookServices.getCategories();
    bookServices.categories = categories;
}
$(document).ready(async function()  {
    // Load the home page on initial load
    await fetchCategories();
    loadPartial('header', '#header');

    $(window).on('hashchange', router.init);
    router.init();
});
