const express = require('express')
const router = express.Router()
const { payment } = require('../controllers/payment')

module.exports = async (req, res) => {
    try {
        const { amount } = req.body;  
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: "usd"
        });
  
        res.status(200).send(paymentIntent.client_secret);
      } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message });
      }
}
