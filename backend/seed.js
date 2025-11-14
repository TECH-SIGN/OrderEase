const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const MenuItem = require('./models/MenuItem');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

const sampleMenuItems = [
  {
    name: 'Veg Spring Rolls',
    price: 120,
    category: 'Starters',
    description: 'Crispy spring rolls filled with fresh vegetables',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=300&h=200&fit=crop',
    isAvailable: true,
  },
  {
    name: 'Paneer Tikka',
    price: 180,
    category: 'Starters',
    description: 'Grilled cottage cheese with Indian spices',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&h=200&fit=crop',
    isAvailable: true,
  },
  {
    name: 'Veg Burger',
    price: 99,
    category: 'Fast Food',
    description: 'Delicious veggie patty with fresh vegetables',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=300&h=200&fit=crop',
    isAvailable: true,
  },
  {
    name: 'Margherita Pizza',
    price: 249,
    category: 'Fast Food',
    description: 'Classic pizza with tomato sauce, mozzarella and basil',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=200&fit=crop',
    isAvailable: true,
  },
  {
    name: 'Butter Chicken',
    price: 280,
    category: 'Main Course',
    description: 'Creamy tomato-based curry with tender chicken pieces',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&h=200&fit=crop',
    isAvailable: true,
  },
  {
    name: 'Paneer Butter Masala',
    price: 240,
    category: 'Main Course',
    description: 'Rich and creamy cottage cheese curry',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=200&fit=crop',
    isAvailable: true,
  },
  {
    name: 'Dal Makhani',
    price: 180,
    category: 'Main Course',
    description: 'Creamy black lentils cooked overnight',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop',
    isAvailable: true,
  },
  {
    name: 'Coca Cola',
    price: 40,
    category: 'Drinks',
    description: 'Chilled soft drink',
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300&h=200&fit=crop',
    isAvailable: true,
  },
  {
    name: 'Fresh Lime Soda',
    price: 60,
    category: 'Drinks',
    description: 'Refreshing lime soda with mint',
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=300&h=200&fit=crop',
    isAvailable: true,
  },
  {
    name: 'Mango Lassi',
    price: 80,
    category: 'Drinks',
    description: 'Sweet yogurt drink with mango',
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=300&h=200&fit=crop',
    isAvailable: true,
  },
  {
    name: 'Gulab Jamun',
    price: 60,
    category: 'Desserts',
    description: 'Sweet milk-solid balls in sugar syrup',
    image: 'https://images.unsplash.com/photo-1585759071429-c8500589c5e1?w=300&h=200&fit=crop',
    isAvailable: true,
  },
  {
    name: 'Ice Cream Sundae',
    price: 120,
    category: 'Desserts',
    description: 'Vanilla ice cream with chocolate sauce and nuts',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=200&fit=crop',
    isAvailable: true,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await MenuItem.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Create menu items
    await MenuItem.insertMany(sampleMenuItems);
    console.log('✅ Menu items seeded successfully');

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@orderease.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log('✅ Admin user created');
    console.log('   Email: admin@orderease.com');
    console.log('   Password: admin123');

    // Create customer user
    const customerUser = await User.create({
      name: 'John Doe',
      email: 'customer@orderease.com',
      password: 'customer123',
      role: 'customer',
    });
    console.log('✅ Customer user created');
    console.log('   Email: customer@orderease.com');
    console.log('   Password: customer123');

    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
