const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];   


    // Kiểm tra sự tồn tại của header và định dạng "Bearer <token>"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Truy cập bị từ chối. Vui lòng đăng nhập.' });
    }

    const token = authHeader.split(' ')[1]; // Lấy token từ header

    console.log('Token nhận được:', token);

    try {
        // Xác thực và giải mã token, kiểm tra padding nếu cần
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Thông tin người dùng đã giải mã:', decoded);

        req.user = decoded;
        next();
    } catch (err) {
        console.error('Lỗi xác thực token:', err);

        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Token đã hết hạn. Vui lòng đăng nhập lại.' });
        } else if (err.message === 'jwt malformed') {
            return res.status(403).json({ message: 'Token không đúng định dạng.' });
        } else {
            return res.status(403).json({ message: 'Token không hợp lệ.' });
        }
    }
}
// ... (phần còn lại của code)

const authorizeAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Truy cập bị từ chối' });
    }
    next();
};

module.exports = {
    authenticateToken,
    authorizeAdmin,
};