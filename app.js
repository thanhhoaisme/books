//"validator": "^13.12.0"
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const pool = require('./server/config/db');

const userRoutes = require('./server/routes/userRoutes');
const categoryRoutes= require('./server/routes/categoryRoutes');
const bookRoutes= require('./server/routes/bookRoutes');
const { authenticateToken, authorizeAdmin } = require('./server/routes/authMiddleware');
const adminRoutes = require('./server/routes/adminRoutes'); 
app.use(cors());

app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

app.use('/images', express.static(path.join(__dirname, 'client/images')));

// use routes
app.use('/api/categories', categoryRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/admin', authenticateToken, authorizeAdmin, adminRoutes); 

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/index.html'));
});

app.listen(8989, () => {
    console.log('Server backend running on 8989');
});

