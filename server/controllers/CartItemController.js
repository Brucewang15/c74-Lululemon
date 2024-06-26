const {
    addToCart,
    deleteFromCart,
    updateCartItem,
    getAllCartItems
} = require('../models/CartItemDao');

const CartItemController = (app) => {
    app.post('/cart/add', async (req, res) => {
        try {
            const cartItem = await addToCart(req.body);
            res.status(201).json(cartItem);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    app.delete('/cart/delete/:id', async (req, res) => {
        try {
            await deleteFromCart(req.params.id);
            res.status(200).json({ message: 'Item removed from cart' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    app.post('/cart/update/:id', async (req, res) => {
        try {
            const cartItem = await updateCartItem(req.params.id, req.body);
            res.status(200).json(cartItem);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    app.get('/cart', async (req, res) => {
        try {
            const cartItems = await getAllCartItems();
            res.status(200).json(cartItems);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
};

module.exports = CartItemController;

