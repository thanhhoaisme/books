const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // Lấy token từ header Authorization
    const token = req.headers['authorization']?.split(' ')[1]; // Kiểm tra null và tách token

    if (!token) {
        return res.status(401).json({ message: 'Truy cập bị từ chối. Vui lòng đăng nhập.' });
    }

    try {
        // Xác thực token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Lưu thông tin người dùng vào req.user
        next(); // Cho phép tiếp tục xử lý request
    } catch (err) {
        // Xử lý lỗi xác thực token
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Token đã hết hạn. Vui lòng đăng nhập lại.' });
        } else {
            return res.status(403).json({ message: 'Token không hợp lệ.' });
        }
    }
};

const authorizeAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Truy cập bị từ chối. Bạn không có quyền truy cập.' });
    }
    next();
};

module.exports = {
    authenticateToken,
    authorizeAdmin
};