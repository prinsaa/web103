const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables

console.log('Database URL: ', process.env.DATABASE_URL);


// Create a new pool using DATABASE_URL
const pool = new Pool({
  
  connectionString: process.env.DATABASE_URL, // Use DATABASE_URL for the connection
  ssl: {
    rejectUnauthorized: false // Enable SSL if needed
  }
});

// Export a query function
const query = (text, params) => pool.query(text, params);

module.exports = { query };
