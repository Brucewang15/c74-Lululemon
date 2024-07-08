const {
    addToCart,
    deleteFromCart,
    updateCartItem,
    getAllCartItems,
    findOne,
    deleteAllCartItems
} = require('../models/CartItemDao');

const CartItemController = (app) => {
    app.post('/cart/add', async (req, res) => {
        console.log("adding to cart ==== ", req.body);
        const { productId, colorId, size, price, image, name, swatchName } = req.body;

        try {
            // Check if the item already exists in the cart
            const existingCartItem = await findOne({ productId, colorId, size });

            if (existingCartItem) {
                // If item exists, update the quantity
                existingCartItem.quantity += 1;
                const updatedCartItem = await existingCartItem.save();
                res.status(200).json(updatedCartItem);
            } else {
                // If item does not exist, create a new cart item
                const newCartItem = await addToCart(req.body);
                res.status(201).json(newCartItem);
            }
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

    app.delete('/cart/cleanup', async (req, res) => {
        try {
            await deleteAllCartItems();
            res.status(200).json({ message: 'All cart items deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })
};

module.exports = CartItemController;

