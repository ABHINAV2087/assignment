const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: '' },  // Optional field for image URL (default empty string)
  description: { type: String, default: '' },  // Optional field for product description (default empty string)
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', required: true },
}, { timestamps: true });  // Automatically adds 'createdAt' and 'updatedAt'

// Avoid overwriting the model if it's already defined
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;
