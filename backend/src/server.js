// server.js
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRETE_KEY);
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Your Product',
            },
            unit_amount: req.body.amount, // Change amount based on your requirements
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success', // Redirect to success page
      cancel_url: 'http://localhost:3000/cancel', // Redirect to cancel page
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to create checkout session' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
