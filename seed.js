require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');
const Subcategory = require('./models/Subcategory');
const Product = require('./models/Product');

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected for seeding'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Dummy data
const categories = [
  { name: 'Clothing' },
  { name: 'Shoes' },
  { name: 'Electronics' },
  { name: 'Home Appliances' },
];

const subcategories = [
  { name: 'Shirts', category: null },
  { name: 'Pants', category: null },
  { name: 'Sneakers', category: null },
  { name: 'Boots', category: null },
  { name: 'Mobiles', category: null },
  { name: 'Laptops', category: null },
  { name: 'Kitchen Appliances', category: null },
  { name: 'Living Room Appliances', category: null },
];

// More Products (with images)
const products = [
  { name: 'Casual Shirt', price: 1200, image: 'shirt1.jpg', subcategory: 'Shirts' },
  { name: 'Formal Shirt', price: 1500, image: 'shirt2.jpg', subcategory: 'Shirts' },
  { name: 'Jeans', price: 2000, image: 'pants1.jpg', subcategory: 'Pants' },
  { name: 'Chinos', price: 1800, image: 'pants2.jpg', subcategory: 'Pants' },
  { name: 'Running Sneakers', price: 4000, image: 'sneakers1.jpg', subcategory: 'Sneakers' },
  { name: 'Hiking Boots', price: 6000, image: 'boots1.jpg', subcategory: 'Boots' },
  { name: 'iPhone 13', price: 80000, image: 'mobile1.jpg', subcategory: 'Mobiles' },
  { name: 'Samsung Galaxy S22', price: 75000, image: 'mobile2.jpg', subcategory: 'Mobiles' },
  { name: 'MacBook Air', price: 95000, image: 'laptop1.jpg', subcategory: 'Laptops' },
  { name: 'Dell XPS 13', price: 85000, image: 'laptop2.jpg', subcategory: 'Laptops' },
  { name: 'Blender', price: 5000, image: 'kitchen1.jpg', subcategory: 'Kitchen Appliances' },
  { name: 'Microwave Oven', price: 12000, image: 'kitchen2.jpg', subcategory: 'Kitchen Appliances' },
  { name: 'Smart TV', price: 40000, image: 'living1.jpg', subcategory: 'Living Room Appliances' },
  { name: 'Air Conditioner', price: 35000, image: 'living2.jpg', subcategory: 'Living Room Appliances' },

  // More products added below
  { name: 'V-Neck Shirt', price: 1400, image: 'shirt3.jpg', subcategory: 'Shirts' },
  { name: 'Graphic Tee', price: 1000, image: 'shirt4.jpg', subcategory: 'Shirts' },
  { name: 'Slim Fit Jeans', price: 2200, image: 'pants3.jpg', subcategory: 'Pants' },
  { name: 'Cargo Pants', price: 2500, image: 'pants4.jpg', subcategory: 'Pants' },
  { name: 'Leather Boots', price: 8000, image: 'boots2.jpg', subcategory: 'Boots' },
  { name: 'Sports Sneakers', price: 5500, image: 'sneakers2.jpg', subcategory: 'Sneakers' },
  { name: 'OnePlus 9', price: 65000, image: 'mobile3.jpg', subcategory: 'Mobiles' },
  { name: 'Google Pixel 6', price: 70000, image: 'mobile4.jpg', subcategory: 'Mobiles' },
  { name: 'Asus ZenBook', price: 85000, image: 'laptop3.jpg', subcategory: 'Laptops' },
  { name: 'HP Spectre x360', price: 90000, image: 'laptop4.jpg', subcategory: 'Laptops' },
  { name: 'Dishwasher', price: 25000, image: 'kitchen3.jpg', subcategory: 'Kitchen Appliances' },
  { name: 'Refrigerator', price: 30000, image: 'kitchen4.jpg', subcategory: 'Kitchen Appliances' },
  { name: 'LED TV', price: 45000, image: 'living3.jpg', subcategory: 'Living Room Appliances' },
  { name: 'Air Purifier', price: 15000, image: 'living4.jpg', subcategory: 'Living Room Appliances' },
];

// Seed the database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Product.deleteMany({});
    await Subcategory.deleteMany({});
    await Category.deleteMany({});
    console.log('Existing data cleared');

    // Insert categories
    const insertedCategories = await Category.insertMany(categories);
    console.log('Categories inserted:', insertedCategories);

    // Map subcategories to categories
    subcategories[0].category = insertedCategories.find((cat) => cat.name === 'Clothing')._id;
    subcategories[1].category = insertedCategories.find((cat) => cat.name === 'Clothing')._id;
    subcategories[2].category = insertedCategories.find((cat) => cat.name === 'Shoes')._id;
    subcategories[3].category = insertedCategories.find((cat) => cat.name === 'Shoes')._id;
    subcategories[4].category = insertedCategories.find((cat) => cat.name === 'Electronics')._id;
    subcategories[5].category = insertedCategories.find((cat) => cat.name === 'Electronics')._id;
    subcategories[6].category = insertedCategories.find((cat) => cat.name === 'Home Appliances')._id;
    subcategories[7].category = insertedCategories.find((cat) => cat.name === 'Home Appliances')._id;

    const insertedSubcategories = await Subcategory.insertMany(subcategories);
    console.log('Subcategories inserted:', insertedSubcategories);

    // Map products to subcategories, categories
    products.forEach((product) => {
      // Find the corresponding subcategory for each product
      const subcategory = insertedSubcategories.find((sub) => sub.name === product.subcategory);
      if (subcategory) {
        product.subcategory = subcategory._id;
        // Link the product to the category through the subcategory
        product.category = subcategory.category;
      }
    });

    // Insert products
    await Product.insertMany(products);
    console.log('Products inserted');
  } catch (err) {
    console.error('Error seeding data:', err);
  }
};

// Run the seed function
seedDatabase().then(() => mongoose.disconnect());
