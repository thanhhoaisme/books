const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { pool } = require('../config/db');

// const { authenticateToken } = require('./authMiddleware'); // You might not need this anymore


const JWT_SECRET = process.env.JWT_SECRET;
router.post('/register', async (req, res) => {
    const { username, password, role = 'user', address } = req.body;

    try {
        // Kiểm tra độ dài mật khẩu (giả sử tối thiểu 6 ký tự)
        if (password.length < 6) {
            return res.status(400).json({ error: 'Mật khẩu phải có ít nhất 6 ký tự' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database 
        const query = `
            INSERT INTO users (username, password, role, address)
            VALUES ($1, $2, $3, $4) RETURNING id
        `;
        const values = [username, hashedPassword, role, address]; 

        const result = await pool.query(query, values);

        res.status(201).json({ userId: result.rows[0].id });
    } catch (error) {
        console.error('Error registering user:', error);
        if (error.code === '23505') { // Unique violation 
            res.status(400).json({ error: 'Username already taken' });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const query = 'SELECT * FROM users WHERE username = $1';
        const result = await pool.query(query, [username]);
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Đăng nhập thất bại' });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: 'Mật khẩu phải có ít nhất 6 ký tự' });
        }
        const user = result.rows[0];

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Đăng nhập thất bại' });
        }
         // Tạo token JWT
         const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' }); // Ví dụ: token hết hạn sau 1 giờ

         // Gửi token về cho client
         res.json({ token }); 
       
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// API đăng nhập cho admin
router.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const query = 'SELECT * FROM admin WHERE username = $1'; // Giả sử bạn có bảng 'admin' riêng
        const result = await pool.query(query, [username]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const admin = result.rows[0];
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({   
 userId: admin.id, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error logging in admin:', error.message);
        res.status(500).json({ error: 'Internal server error'   
 });
    }
});

module.exports = router;

