import { getCategoryItem } from "../services/bookServices.js";

function generateBookItem (book) {
    const category = getCategoryItem(book.category_id);
    return `
        <div class="book-item">
            <img src="${book.image}" alt="${book.title}">
            <div class="book-item-content">
                <h2>${book.title}</h2>
                <div class="price">#${book.price}</div>
                <div class="category">${category.name}</div>
                <a href="#book-detail?id=${book.id}" class="details-link">View Details</a>
                <button class="add-to-cart" data-id="${book.id}">Add to Cart</button>
            </div>
        </div>`
}

export { generateBookItem };