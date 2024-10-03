const express = require('express');
const path = require('path');
const db = require('./db');
const {insertBooks} = require('./db');

const app = express();
const PORT = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Dummy data for the self-help books
const booksData = [
  { 
    id: 1, 
    title: "Atomic Habits", 
    author: "James Clear", 
    description: "A book on building good habits.", 
    imageUrl: "/images/Atomic_Habit.jpg", 
    purchaseUrl: "https://www.amazon.com/dp/0735211299" 
  },
  { 
    id: 2, 
    title: "The Power of Now", 
    author: "Eckhart Tolle", 
    description: "Focuses on mindfulness.", 
    imageUrl: "/images/PowerOfNow.jpg", 
    purchaseUrl: "https://www.amazon.com/dp/1577314808" 
  },
  { 
    id: 3, 
    title: "The 7 Habits of Highly Effective People", 
    author: "Stephen Covey", 
    description: "Teaches principles of personal effectiveness.", 
    imageUrl: "/images/SevenHabits.jpg", 
    purchaseUrl: "https://www.amazon.com/dp/1982137274" 
  },
  { 
    id: 4, 
    title: "Thinking, Fast and Slow", 
    author: "Daniel Kahneman", 
    description: "Insights into how we think.", 
    imageUrl: "/images/Thinking.jpg", 
    purchaseUrl: "https://www.amazon.com/dp/0374533555" 
  },
  { 
    id: 5, 
    title: "You Are a Badass", 
    author: "Jen Sincero", 
    description: "A motivational guide to changing your life.", 
    imageUrl: "/images/Badass.jpg", 
    purchaseUrl: "https://www.amazon.com/dp/0762447699" 
  },
  { 
    id: 6, 
    title: "The Four Agreements", 
    author: "Don Miguel Ruiz", 
    description: "A practical guide to personal freedom.", 
    imageUrl: "/images/Four.jpg", 
    purchaseUrl: "https://www.amazon.com/dp/1878424319" 
  },
  { 
    id: 7, 
    title: "How to Win Friends and Influence People", 
    author: "Dale Carnegie", 
    description: "Timeless principles for building meaningful relationships.", 
    imageUrl: "/images/WinPeople.jpg", 
    purchaseUrl: "https://www.amazon.com/dp/0671027034" 
  },
  { 
    id: 8, 
    title: "Man's Search for Meaning", 
    author: "Viktor Frankl", 
    description: "Explores finding meaning in life even through suffering.", 
    imageUrl: "/images/ManSearch.jpg", 
    purchaseUrl: "https://www.amazon.com/dp/080701429X" 
  }
];

// Insert books into the database when the server starts --> this was done twice and then commented out.
const initializeDatabase = async () => {
  try {
    await insertBooks(booksData);
    console.log('All books have been inserted successfully!');
  } catch (error) {
    console.error('Error inserting books:', error);
  }
};

// Call the initialization function
// initializeDatabase();


// Route for the home page (rendering with EJS)
app.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM books'); // Adjust the query based on your table name
    const books = result.rows;
    res.render('index', { books });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).send('Internal Server Error: ' + error.message); // Include error message in response
  }
});

// Function to get a book by ID from the database
const getBookById = async (id) => {
  const queryText = 'SELECT * FROM books WHERE id = $1';
  const values = [id];
  
  try {
    const res = await db.query(queryText, values);
    return res.rows[0]; // Return the first book found
  } catch (error) {
    console.error('Error fetching book:', error);
    throw error; // Handle the error appropriately
  }
};

// Route to get details for a specific book by ID
app.get('/book/:id', async (req, res) => {
  const bookId = parseInt(req.params.id);
  try {
    const book = await getBookById(bookId);
    
    if (!book) {
      return res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
    }

    res.send(`
      <html>
          <head>
              <title>${book.title}</title>
              <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css">
              <link rel="stylesheet" href="/style.css">
              <style>
              body {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  margin: 0;
              }
              .container {
                  text-align: center;
              }
              </style>
          </head>

          <body>
              <main class="container">
                  <h1>${book.title}</h1>
                  <img src="${book.imageurl}" alt="${book.title}" style="width: 200px; height: auto;">
                  <p><strong>Author:</strong> ${book.author}</p>
                  <p>${book.description}</p>
                  <p>If you're interested, you can <a href="${book.purchaseurl}" target="_blank">buy this book here</a>!</p>
                  <a href="/" class="button-outline">Go back to the list</a>
              </main>
          </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

// Handle 404 page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
