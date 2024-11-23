const express = require('express');
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');
const router = express.Router();

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories); // Send categories as JSON response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new category
router.post('/add', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Category name is required' });
  }

  const newCategory = new Category({ name });

  try {
    await newCategory.save();
    res.status(201).json({ message: 'Category added successfully', category: newCategory });
  } catch (err) {
    res.status(500).json({ message: 'Error adding category', error: err.message });
  }
});

// Update a category by ID
router.put('/update/:id', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Category name is required' });
  }

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category updated successfully', category: updatedCategory });
  } catch (err) {
    res.status(500).json({ message: 'Error updating category', error: err.message });
  }
});

// Delete a category by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully', deletedCategory });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting category', error: err.message });
  }
});

module.exports = router;
