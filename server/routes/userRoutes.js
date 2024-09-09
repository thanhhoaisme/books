const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { pool } = require('../config/db');
const { authenticateToken, authorizeAdmin } = require('./authMiddleware');
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    const { username, password, role = 'user', address } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const query = `
            INSERT INTO users (username, password, role, address)
            VALUES ($1, $2, $3, $4) RETURNING id
        `;
        const values = [
            username, hashedPassword, role, address
        ];

        const result = await pool.query(query, values);

        res.status(201).json({ userId: result.rows[0].id });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const query = 'SELECT * FROM users WHERE username = $1';
        const result = await pool.query(query, [username]);
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = result.rows[0];

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userName: username, userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        // In ra thông tin đăng nhập thành công và token để kiểm tra
        console.log('Đăng nhập thành công cho người dùng:', username);
        console.log('Token đã tạo:', token);

        // Kiểm tra role và gửi phản hồi tương ứng
        if (user.role === 'admin') {
            res.json({ token, role: user.role, redirectTo: '/admin' }); 
        } else {
            res.json({ token, role: user.role, redirectTo: '/' }); 
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




module.exports = router;