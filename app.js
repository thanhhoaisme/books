//"validator": "^13.12.0"
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const pool = require('./server/config/db');
const { authenticateToken } = require('./server/routes/authMiddleware'); 
const userRoutes = require('./server/routes/userRoutes');
const categoryRoutes= require('./server/routes/categoryRoutes');
const bookRoutes= require('./server/routes/bookRoutes');
<<<<<<< HEAD
const adminRoutes = require('./server/routes/adminRoutes');
=======
const cartRoutes= require('./server/routes/cartRoutes');
>>>>>>> d35cd51ab72caf0e33964fa30398ad3490ef577f

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// use routes
app.use('/categories', categoryRoutes);
app.use('/books', bookRoutes);
app.use('/users', userRoutes);
<<<<<<< HEAD
app.use('/api/admin', adminRoutes);
=======
app.use('/cart',  cartRoutes); 
>>>>>>> d35cd51ab72caf0e33964fa30398ad3490ef577f
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(8989, () => {
    console.log('Server backend running on 8989');
});

