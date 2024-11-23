const express = require('express');
const Subcategory = require('../models/Subcategory'); // Correct path to Subcategory model
const Category = require('../models/Category'); // Correct path to Category model
const router = express.Router();

router.get('/', async (req, res) => {
  const { categoryId } = req.query;
  if (!categoryId) {
    return res.status(400).json({ error: 'Category ID is required' });
  }

  try {
    const subcategories = await Subcategory.find({ category: categoryId });
    res.json(subcategories);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching subcategories', details: err.message });
  }
});

// Add a new subcategory
router.post('/add', async (req, res) => {
  const { name, categoryId } = req.body;

  if (!name || !categoryId) {
    return res.status(400).json({ error: 'Subcategory name and category ID are required' });
  }

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const newSubcategory = new Subcategory({
      name,
      category: categoryId
    });

    await newSubcategory.save();
    res.status(201).json({ message: 'Subcategory added successfully', subcategory: newSubcategory });
  } catch (err) {
    res.status(500).json({ error: 'Error adding subcategory', details: err.message });
  }
});

// Update a subcategory
router.put('/update/:id', async (req, res) => {
  const { name, categoryId } = req.body;

  if (!name && !categoryId) {
    return res.status(400).json({ error: 'At least one field (name or categoryId) is required for update' });
  }

  try {
    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      req.params.id,
      { name, category: categoryId },
      { new: true }
    );

    if (!updatedSubcategory) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }

    res.json({ message: 'Subcategory updated successfully', subcategory: updatedSubcategory });
  } catch (err) {
    res.status(500).json({ error: 'Error updating subcategory', details: err.message });
  }
});

// Delete a subcategory
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedSubcategory = await Subcategory.findByIdAndDelete(req.params.id);
    if (!deletedSubcategory) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }
    res.json({ message: 'Subcategory deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting subcategory', details: err.message });
  }
});


module.exports = router;
