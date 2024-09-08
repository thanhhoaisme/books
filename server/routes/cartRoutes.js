const express = require('express');
const router = express.Router();
const { pool } = require('../config/db'); // Giả sử bạn đã cấu hình kết nối đến cơ sở dữ liệu
const { authenticateToken } = require('./authMiddleware'); // Import middleware

// Lấy giỏ hàng của người dùng
router.get('/', authenticateToken, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const userId = req.user.id;

  try {
    const query = 'SELECT * FROM cart_items WHERE user_id = $1';
    const result = await pool.query(query, [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error getting cart:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Thêm sản phẩm vào giỏ hàng
router.get('/', authenticateToken, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const userId = req.user.id;
  console.log('userId:', userId)
  const { bookId, quantity } = req.body;

  try {
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng hay chưa
    const checkQuery = `
      SELECT * FROM cart_items 
      WHERE user_id = $1 AND book_id = $2
    `;
    const checkResult = await pool.query(checkQuery, [userId, bookId]);

    if (checkResult.rows.length > 0) {
      // Nếu sản phẩm đã tồn tại, cập nhật số lượng
      const updateQuery = `
        UPDATE cart_items 
        SET quantity = quantity + $1
        WHERE user_id = $2 AND book_id = $3
        RETURNING *
      `;
      const updateValues = [quantity, userId, bookId];
      const updateResult = await pool.query(updateQuery, updateValues);
      res.status(200).json(updateResult.rows[0]); // Trả về mục giỏ hàng đã cập nhật
    } else {
      // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
      const insertQuery = `
        INSERT INTO cart_items (user_id, book_id, quantity)
        VALUES ($1, $2, $3)
        RETURNING *
      `;
      const insertValues = [userId, bookId, quantity];
      const insertResult = await pool.query(insertQuery, insertValues);
      res.status(201).json(insertResult.rows[0]); // Trả về mục giỏ hàng mới
    }
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});






module.exports = router;