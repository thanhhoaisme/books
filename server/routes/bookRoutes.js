const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const { pool } = require('../config/db');
const { authenticateToken, authorizeAdmin } = require('./authMiddleware');

// Route to get all books
router.get('/', async (req, res) => {
    const categoryId = parseInt(req.query.category);  // Get category from query string
    const limit = parseInt(req.query.limit) || 50;    // Default limit is 30 if not provided

    let query = 'SELECT * FROM books';
    let values = [];

    // If category filter is provided
    if (!isNaN(categoryId)) {
        query += ' WHERE category_id = $1';
        values.push(categoryId);
    }

    // Apply limit to the query
    query += ' LIMIT $' + (values.length + 1);
    values.push(limit);

    try {
        const booksResult = await pool.query(query, values);
        res.json(booksResult.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/:id', async (req, res) => {
    const bookId = req.params.id;

    try {
        const bookResult = await pool.query('SELECT * FROM books WHERE id = $1', [bookId]);
        
        if (bookResult.rows.length > 0) {
            res.json(bookResult.rows[0]);
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'client/images');   
   // Lưu ảnh vào thư mục 'client/images'
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Đặt tên file theo thời gian và tên gốc
    }
  });
const upload = multer({ storage: storage });

// Route to add a new book
router.post('/', authenticateToken, authorizeAdmin, upload.single('image'), async (req, res) => {
    const { title, description, price, category, stock_quantity } = req.body; // Lấy thêm stock_quantity từ body
    const imageUrl = `/images/${req.file.filename}`; 

    const newBook = {
        title,
        description,
        price: parseFloat(price),
        image: imageUrl, 
        category_id: parseInt(category),
        stock_quantity: parseInt(stock_quantity) || 0 // Xử lý trường hợp không có stock_quantity hoặc không phải số
    };

    const query = `
    INSERT INTO books (title, description, price, image, category_id, stock_quantity)
    VALUES ($1, $2, $3, $4, $5, $6) 
    /* RETURNING *; */  -- Sửa lỗi comment ở đây
`;

    const values = [newBook.title, newBook.description, newBook.price, newBook.image, newBook.category_id, newBook.stock_quantity];

    try {
        const result = await pool.query(query, values); 

        // Lấy toàn bộ thông tin sách mới (bao gồm cả stock_quantity)
        const addedBook = result.rows[0];

        res.status(201).json({ 
            success: true, 
            message: 'Book added successfully',
            newBook: addedBook 
        });
    } catch (err) {
        console.error('Error adding book:', err);
        res.status(500).json({ error: 'Error adding book' });
    }
});

router.put('/:id', upload.single('image'), (req, res) => {
    const bookId = req.params.id;

    // Lấy giá trị stock_quantity từ req.body, nếu không có thì giữ nguyên giá trị cũ
    const stock_quantity = req.body.stock_quantity ? parseInt(req.body.stock_quantity) : undefined; 

    // Build the update query and the values dynamically based on provided fields
    let query = 'UPDATE books SET title = $1, description = $2, price = $3, category_id = $4';
    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.category
    ];

    // If an image is uploaded, add the image URL to the update
    if (req.file) {
        query += ', image = $5';
        values.push(`/images/${req.file.filename}`);
    }

    // If stock_quantity is provided, add it to the update
    if (stock_quantity !== undefined) {
        query += ', stock_quantity = $' + (values.length + 1);
        values.push(stock_quantity);
    }

    // Add the WHERE clause and the bookId to the values
    query += ' WHERE id = $' + (values.length + 1);
    values.push(bookId);

    // Run the update query
    pool.query(query, values, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.json({ success: true, message: 'Book updated successfully' });
    });
});

router.delete('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const bookId = req.params.id;
        const result = await pool.query('SELECT * FROM books WHERE id = $1', [bookId]);
        
        // Replace this with your actual delete query
        pool.query('DELETE FROM books WHERE id = $1', [bookId], (err) => {
        if (err) {
            res.json({ success: false, message: 'Error deleting book' });
        } else {
            // Now delete the image file
            const imagePath = result.rows[0].image;
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Error deleting image:', err);
                }
                // Finally, send a success response
                res.json({ message: 'Book and image deleted successfully' });
            });
        }
        }); 
    } catch {
        console.error('Error fetching:', err);
        return res.status(500).json({ error: 'Database error' });
    }
  });

module.exports = router;