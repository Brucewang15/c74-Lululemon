require('dotenv').config()

const express = require('express')
const app = express

app.use(express.json())

const stripe = require ('stripe')("pk_test_51PnMZjIsvOFHvBvCO3hpgLRwd5oJSwBsUz0P11DOs3cQsYGMjiFQsdT1opFFeJZmHbxX2eOuWFqT4SAKkINTNJRi00vpdvOXdh")

const storeItems = new Map([
    [1, {price: 100, name: 'testing'}]
])

