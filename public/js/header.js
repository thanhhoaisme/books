import { getUserInfo } from "../helpers/auth.js"
import { calculateCartItems } from "../helpers/cart.js";
import bookServices from '../services/bookServices.js';

let dropdownContent;
let categoriesLoaded = false;

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

        // Đảm bảo rằng DOM đã được tải đầy đủ và danh mục đã được tải
        $(document).ready(async function() {
            // Chỉ tải danh mục nếu chưa được tải
            if (!categoriesLoaded) {
                await bookServices.getCategories();
            }
            initCategory(); 
        });

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
    }
}

init();

export default {
    init
};