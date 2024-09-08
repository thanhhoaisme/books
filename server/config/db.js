const dotenv = require('dotenv');
dotenv.config(); // Read the .env file

const { Pool } = require('pg');

// Use environment variables in the Pool configuration
const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD, // Corrected typo here (ppassword -> password)
  port: process.env.DATABASE_PORT,
  // ssl: {  // Remove this block if you're not using SSL
  //   rejectUnauthorized: true,
  //   ca: process.env.CA 
  // }
});

// Log the database host and other connection details
console.log("Database Host:", process.env.DATABASE_HOST);
console.log("Database User:", process.env.DATABASE_USER);
console.log("Database Password:", process.env.DATABASE_PASSWORD); 
console.log("Database Port:", process.env.DATABASE_PORT);

// Check the database connection
pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1); // Exit the process if unable to connect
  } else {
    console.log('Database connected!');
  }
});

// Return the "pool" instance for use in other files
module.exports = { pool };