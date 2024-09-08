import { getUserInfo } from "../helpers/auth.js"
import { calculateCartItems } from "../helpers/cart.js";
import bookServices from '../services/bookServices.js';

function initCategory() {
    const dropdownContent = $('#category-dropdown');
    dropdownContent.empty(); // Clear existing categories before adding new ones

    // Populate dropdown content with categories
    dropdownContent.append('<a href="#book-list">All Categories</a>'); // Add "All Categories" option at the beginning
    bookServices.categories.forEach(category => {
        dropdownContent.append(`<a href="#book-list?category=${category.id}">${category.name}</a>`);
    })
}

function searchBookList() {
    const searchStr = $('#search-input').val();
    if(searchStr) {
        location.hash = `#book-list?searchStr=${searchStr}`;
    } else {
        location.hash = '#book-list';
    }
}
function init() {
    const user = getUserInfo();
    if(user) {
        $('#user-info').text(`Welcome, ${user.userName}`); // Replace with actual user info if available
        $('#auth-btn').text('Logout');
        $('#auth-btn').off('click').on('click', function() {
            localStorage.removeItem('token'); // Remove auth token
            location.reload(); // Reload the page to update navbar
        });
    } else {
        $('#user-info').text('');
        $('#auth-btn').text('Login');
        $('#auth-btn').off('click').on('click', function() {
            location.hash = '#login'; // Redirect to login page
        });
    }
    $('#cart-count').text(calculateCartItems());
    initCategory();

    window.addEventListener('cart-updated', function() {
        $('#cart-count').text(calculateCartItems())
    });
    $('.header').on('click', '#search-btn', function() {
        searchBookList();
    });
    $('.header').on('keypress', '#search-input', function(e) {
        var key = e.which;
        if(key == 13) {
            searchBookList();
        }
    });
}

init();

export default {
    init
}