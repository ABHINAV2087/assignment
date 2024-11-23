const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const categoryRoutes = require('./routes/categoryRoutes');  // Importing the category routes
const subcategoryRoutes = require('./routes/subcategoryRoutes'); // Importing the subcategory routes
const productRoutes = require('./routes/productRoutes');  
const Category = require('./models/Category'); // Import the Category model

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // To parse JSON body requests
app.use(cors());

// MongoDB connection
require('dotenv').config();
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use the category and subcategory routes
app.use('/api/categories', categoryRoutes); // Use category routes for /api/categories
app.use('/api/subcategories', subcategoryRoutes); // Use subcategory routes for /api/subcategories
app.use('/api/products', productRoutes); // Use subcategory routes for /api/subcategories

// Render the main page to show all categories
app.get('/', async (req, res) => {
  try {
    const categories = await Category.find();  // Now the Category model is defined
    res.render('index', { categories });  // Render index view with categories
  } catch (err) {
    res.status(500).json({ error: 'Error fetching categories', details: err.message });
  }
});
app.get('/manage', async (req, res) => {
  try {
    const categories = await Category.find(); // Fetch categories from MongoDB
    res.render('manage', { categories });    // Pass categories to the EJS template
  } catch (err) {
    console.error('Error fetching categories for manage page:', err);
    res.status(500).send('Error loading manage page');
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
