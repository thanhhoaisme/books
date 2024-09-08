const express = require('express');
const router = express.Router();
const { pool } = require('../config/db'); // Giả sử bạn đã cấu hình kết nối đến cơ sở dữ liệu
const { authenticateToken } = require('./authMiddleware'); 
// Lấy giỏ hàng của người dùng
router.get('/', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
}
  const userId = req.user.id; // Lấy userId từ middleware xác thực (ví dụ: JWT)

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
router.post('/cart', authenticateToken, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' }); // Hoặc thông báo lỗi phù hợp
}
  const userId = req.user.id; // Lấy userId từ middleware xác thực
  const { bookId, quantity } = req.body;
  console.log('userId:', userId);
  console.log('bookId:', bookId);

  try {
    const query = `
      INSERT INTO cart_items (user_id, book_id, quantity)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, book_id) DO UPDATE
      SET quantity = cart_items.quantity + EXCLUDED.quantity
      RETURNING *
    `;
    const values = [userId, bookId, quantity];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Cập nhật số lượng sản phẩm trong giỏ hàng
router.put('/:itemId', async (req, res) => {
  const userId = req.user.id;
  const itemId = req.params.itemId;
  const { quantity } = req.body;

  try {
    const query = `
      UPDATE cart_items 
      SET quantity = $1
      WHERE id = $2 AND user_id = $3
      RETURNING *
    `;
    const values = [quantity, itemId, userId];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating cart item:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Xóa sản phẩm khỏi giỏ hàng
router.delete('/:itemId', async (req, res) => {
  const userId = req.user.id;
  const itemId = req.params.itemId;

  try {
    const query = 'DELETE FROM cart_items WHERE id = $1 AND user_id = $2';
    const result = await pool.query(query, [itemId, userId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    console.error('Error removing cart item:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;