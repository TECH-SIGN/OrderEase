const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Starters', 'Main Course', 'Drinks', 'Desserts', 'Fast Food'],
  },
  description: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/300x200?text=Food+Item',
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
