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

// module.exports = { query };

// Function to insert multiple books into the database
const insertBooks = async (books) => {
  const queryText = `
    INSERT INTO books (title, author, description, imageurl, purchaseurl) 
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;  -- This will return the inserted records
  `;

  for (const book of books) {
    const values = [book.title, book.author, book.description, book.imageUrl, book.purchaseUrl];
    try {
      const res = await pool.query(queryText, values);
      console.log('Inserted book:', res.rows[0]); // Log the inserted book
    } catch (error) {
      console.error('Error inserting book:', error);
      throw error; // Throw the error to handle it later if needed
    }
  }
};

module.exports = { insertBooks, query };
