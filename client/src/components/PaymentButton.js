// src/components/PaymentButton.js
import React from 'react';
import { useStripe } from '@stripe/react-stripe-js';

const PaymentButton = () => {
  const stripe = useStripe();

  const handleClick = async () => {
    try {
      const { sessionId } = await fetch('http://localhost:3001/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 1000 }), // Change amount based on your requirements
      }).then((response) => response.json());

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button onClick={handleClick}>
      Pay with Stripe
    </button>
  );
};

export default PaymentButton;
