// src/components/PaymentPage.js

import React, { useState } from 'react';
import { BASE_URL } from '../helper';
const PaymentPage = ({ onSubmit }) => {
  const [paymentData, setPaymentData] = useState({
    userId: '',
    amount: '',
  });

  const handleChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an API call to submit the payment
      const response = await fetch(`${BASE_URL}/api/payment/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Payment submitted successfully:', responseData);
        alert('Payment submitted successfully');

        // Optionally, you can perform additional actions on successful payment submission

      } else {
        // Handle other response statuses as needed
        const errorData = await response.json();
        console.error('Failed to submit payment:', response.status, response.statusText);
        console.error('Additional error details:', errorData);
        alert('User ID is incorrect');

        // Optionally, you can display an error message to the user
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error during payment submission:', error);

      // Optionally, you can display an error message to the user
    }
  };

  return (
    <div>
      <h2>Payment Page</h2>
      <form onSubmit={handleSubmit}>
        <label>
          User ID:
          <input
            type="text"
            name="userId"
            value={paymentData.userId}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={paymentData.amount}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Make Payment</button>
      </form>
    </div>
  );
};

export default PaymentPage;
