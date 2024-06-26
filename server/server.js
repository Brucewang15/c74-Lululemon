const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const CartItemController = require("./controllers/CartItemController");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/cart', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB.');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB: ', error.message);
    });

CartItemController(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});