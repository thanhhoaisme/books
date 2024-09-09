const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');
const { authenticateToken, authorizeAdmin } = require('./authMiddleware');

// API để cập nhật thông tin sách (chỉ cho phép admin)
router.put('/books/:id', authenticateToken, authorizeAdmin, async (req, res) => {
    const bookId = parseInt(req.params.id);
    const { title, description, price, stock_quantity, image } = req.body;

    try {
        const query = `
            UPDATE books 
            SET title = $1, description = $2, price = $3, stock_quantity = $4, image = $5
            WHERE id = $6
        `;
        const values = [title, description, price, stock_quantity, image, bookId];
        await pool.query(query, values);
        res.json({ message: 'Book updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;