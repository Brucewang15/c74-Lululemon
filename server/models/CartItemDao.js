
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

const findOne = async (query) => {
    return await CartItemModel.findOne(query);
};

const deleteAllCartItems = () => {
    return CartItemModel.deleteMany({});
}

module.exports = {
    addToCart,
    deleteFromCart,
    updateCartItem,
    getAllCartItems,
    findOne,
    deleteAllCartItems,
};