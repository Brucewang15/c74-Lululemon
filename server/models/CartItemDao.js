
const CartItemModel = require('./CartItemModel');

const addToCart = (cartItem) => {
    return CartItemModel.create(cartItem);
}

const deleteFromCart = (itemId) => {
    return CartItemModel.deleteOne({ _id: itemId });
}

const updateCartItem = (itemId, cartItem) => {
    return CartItemModel.updateOne({ _id: itemId }, cartItem);
}

const getAllCartItems = () => {
    return CartItemModel.find();
}

module.exports = {
    addToCart,
    deleteFromCart,
    updateCartItem,
    getAllCartItems
};