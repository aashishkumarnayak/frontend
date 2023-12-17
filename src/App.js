// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import RegistrationForm from './component/RegistrationForm.js';
// import PaymentPage from './component/PaymentPage.js';
// import './component/RegistrationForm.css';
// import './component/PaymentPage.css';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<RegistrationForm />} />
//         <Route path="/payment" element={<PaymentPage />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


// src/App.js

// src/App.js

// src/App.js
// src/App.js
// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './component/RegistrationForm';
import PaymentPage from './component/PaymentPage';
import './component/RegistrationForm.css';
import './component/PaymentPage.css';

const App = () => {
  const [userId, setUserId] = useState(null);

  const handleRegistrationSubmit = async (formData) => {
    try {
      // Assume you have logic to submit the registration form and get the user ID
      const response = await fetch('http://localhost:4000/api/user/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setUserId(data.user._id);
      } else {
        // Handle registration failure
        console.error('Registration failed:', data.message);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error submitting registration:', error);
    }
  };

  const handlePaymentSubmit = async (paymentData) => {
    try {
      // Assume you have logic to submit the payment form
      const response = await fetch('http://localhost:4000/api/payment/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();

      if (data.success) {
        // Handle successful payment
        console.log('Payment successful:', data.message);
      } else {
        // Handle payment failure
        console.error('Payment failed:', data.message);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error submitting payment:', error);
    }
  };

  return (
    <Router>
      <div style={{ maxWidth: '600px', margin: 'auto' }}>
        <Routes>
          <Route
            path="/"
            element={<RegistrationForm onRegistrationSubmit={handleRegistrationSubmit} />}
          />
          <Route
            path="/payment"
            element={<PaymentPage userId={userId} onPaymentSubmit={handlePaymentSubmit} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

