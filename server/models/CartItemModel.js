const mongoose = require('mongoose');
const CartItemSchema = require('./CartItemSchema');

const CartItemModel = mongoose.model('CartItem', CartItemSchema);
module.exports = CartItemModel;