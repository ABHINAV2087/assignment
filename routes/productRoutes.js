// productRoutes.js
const express = require('express');
const Product = require('../models/product');
const router = express.Router();

// Get products for a subcategory
router.get('/', async (req, res) => {
  const { categoryId, subcategoryId } = req.query;

  try {
    const query = {};
    if (categoryId) query.category = categoryId;
    if (subcategoryId) query.subcategory = subcategoryId;

    const products = await Product.find(query).populate('category subcategory');
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// Add a new product
router.post('/add', async (req, res) => {
  const { name, price, categoryId, subcategoryId, description, image } = req.body;

  if (!categoryId || !subcategoryId) {
    return res.status(400).json({ message: 'Category and subcategory are required' });
  }

  const newProduct = new Product({
    name,
    price,
    description,
    image,
    category: categoryId,
    subcategory: subcategoryId
  });

  try {
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Error adding product' });
  }
});

// Delete a product by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully', deletedProduct });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
});


module.exports = router;