const express = require('express');
const router = express.Router();
const { pool } = require('../config/db'); // Giả sử bạn đã cấu hình kết nối đến cơ sở dữ liệu
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';


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
        // Kiểm tra xem người dùng có tồn tại không
        const query = 'SELECT * FROM users WHERE username = $1';
        const result = await pool.query(query, [username]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Đăng nhập thất bại' });
        }

        const user = result.rows[0];

        // Kiểm tra độ dài mật khẩu
        if (password.length < 6) {
            return res.status(400).json({ error: 'Mật khẩu phải có ít nhất 6 ký tự' });
        }

        // So sánh mật khẩu cung cấp với mật khẩu đã băm lưu trong cơ sở dữ liệu
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Đăng nhập thất bại' });
        }

        // Tạo JWT token 
        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        console.log("token",token);
        // Gửi token về cho client
        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;