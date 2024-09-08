const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // Unauthorized - không có token

    console.log('Token nhận được:', token); 

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { 
        if (err) {
            console.error('Lỗi xác thực token:', err); 

            if (err instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ message: 'Token đã hết hạn' });
            } else {
                return res.status(403).json({ message: 'Token không hợp lệ' });
            }
        } 
        
        console.log('Thông tin người dùng đã giải mã:', decoded); 
        req.user = decoded; 
        next();
    });
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