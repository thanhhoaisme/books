const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

// Route to get all books
router.get('/', async (req, res) => {
    try {
        const categoryResult = await pool.query('SELECT * FROM categories');
        res.json(categoryResult.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;