import { getUserInfo } from "../helpers/auth.js"
import { calculateCartItems } from "../helpers/cart.js";
import bookServices from '../services/bookServices.js';
let dropdownContent; 

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
async function init() {
    try {
        const user = await getUserInfo();
        if (user) {
            $('#user-info').text(`Welcome, ${user.userName}`); 
            $('#auth-btn').text('Logout');
            $('#auth-btn').off('click').on('click', function () {
                localStorage.removeItem('token'); 
                location.reload(); 
            });
        } else {
            $('#user-info').text('');
            $('#auth-btn').text('Login');
            $('#auth-btn').off('click').on('click', function () {
                location.hash = '#login'; 
            });
        }

        $('#cart-count').text(calculateCartItems());
        initCategory();

        try {
            const categories = await bookServices.getCategories();
            categories.forEach(category => {
                dropdownContent.append(`<a href="#book-list?category=${category.id}">${category.name}</a>`);
            });
        } catch (error) {
            console.error('Error fetching categories:', error);
            // Handle the error gracefully, e.g., display an error message in the dropdown
            dropdownContent.append('<span class="error">Error loading categories</span>');
        }

        window.addEventListener('cart-updated', function () {
            $('#cart-count').text(calculateCartItems())
        });

        $('.header').on('click', '#search-btn', searchBookList);

        $('.header').on('keypress', '#search-input', function (e) {
            if (e.which === 13) { 
                searchBookList();
            }
        });

    } catch (error) {
        console.error('Error initializing header:', error);
        // Handle the error gracefully, e.g., display a general error message in the header
    }
}

init();

export default {
    init
};