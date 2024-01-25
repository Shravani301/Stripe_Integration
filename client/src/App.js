// src/App.js
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentButton from './components/PaymentButton';

const stripePromise = loadStripe(process.env.public_key);

const App = () => {
  return (
    <div>
      <h1>Stripe Payment Integration</h1>
      <Elements stripe={stripePromise}>
        <PaymentButton />
      </Elements>
    </div>
  );
};

export default App;
