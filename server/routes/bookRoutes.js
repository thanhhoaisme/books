const express = require('express');
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

// Route to add a new book
router.post('/', authenticateToken, authorizeAdmin, async (req, res) => {
    const { name, description, price } = req.body;
    try {
        await pool.query('INSERT INTO books (name, description, price) VALUES ($1, $2, $3)', [name, description, price]);
        res.status(201).json({ message: 'Book added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;