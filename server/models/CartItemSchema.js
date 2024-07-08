const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
    productId: { type: String, required: true },
    colorId: { type: String, required: true },
    size: { type: String, default: "" },
    quantity: { type: Number, required: true },
    price: { type: Number },
    image: { type: String, default: "" },
    name: { type: String, default: "" },
    swatchName: { type: String, default: "" },
});

module.exports = CartItemSchema;