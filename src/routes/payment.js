const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)

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
