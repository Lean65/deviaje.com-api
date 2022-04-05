const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)

module.exports = async (req, res) => {
    // let { amount, id } = req.body
    let { amount } = req.body
    // const amountP = parseInt(amount)
	try {
		const payment = await stripe.paymentIntents.create({
			amount: amount,
			currency: "USD",
			description: "deviaje.com",
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
}
