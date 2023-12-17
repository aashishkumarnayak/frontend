import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../helper';
const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    contactNumber: '',
    emailAddress: '',
    address: '',
    preferredBatch: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const completePayment = () => {
    // Implement your payment logic here
    // This function will be called after the form submission
    // For now, it's an empty function
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const isFormValid = Object.values(formData).every((value) => value.trim() !== '');
  
    if (isFormValid) {
      try {
        const response = await fetch(`${BASE_URL}/api/user/new/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          const responseData = await response.json();
          const userId = responseData.user._id;
  
          console.log('Form submitted successfully');
          // Add any additional actions you want to perform on successful submission
          alert(`Form submitted successfully! Your user ID is: ${userId} please note this ID` );
          navigate('/payment');
          completePayment();
        } else {
          // Handle other response statuses as needed
          const errorData = await response.json();
          console.error('Failed to submit form:', response.status, response.statusText);
          console.error('Additional error details:', errorData);
  
          if (response.status === 409) {
            // Conflict - Duplicate email or phone number
            alert(`Registration failed: ${errorData.message}`);
          } else if (response.status === 400) {
            // Bad Request - Validation error
            if (errorData.message === 'Invalid phone number format') {
              alert('Please enter a valid 10-digit phone number');
            } else {
              alert(`Validation failed: ${errorData.message}`);
            }
          } else {
            // Other errors
            console.error('Failed to submit form:', response.status, response.statusText);
            console.error('Additional error details:', errorData);
          }
        }
      } catch (error) {
        // Handle network or other errors
        console.error('Error during form submission:', error);
      }
    } else {
      alert('Please fill in all fields');
    }
  };
  
  return (
    <div className="form-container">
      <h1 className="form-heading">Admission Form for the Yoga Classes</h1>
      
      <form onSubmit={handleSubmit} className="your-form">
        <label>
          Full Name:
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
        </label>
  
        <label>
          Date of Birth:
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
        </label>
  
        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            {/* Add more options if needed */}
          </select>
        </label>
  
        <label>
          Contact Number:
          <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
        </label>
  
        <label>
          Email Address:
          <input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleChange} />
        </label>
  
        <label>
          Address:
          <textarea name="address" value={formData.address} onChange={handleChange} />
        </label>
  
        <label>
          Preferred Batch:
          <select name="preferredBatch" value={formData.preferredBatch} onChange={handleChange}>
            <option value="6-7AM">Choose Batch</option>
            <option value="6-7AM">6-7AM</option>
            <option value="7-8AM">7-8AM</option>
            <option value="8-9AM">8-9AM</option>
            <option value="5-6PM">5-6PM</option>
          </select>
        </label>
  
        <button type="submit">Submit</button>
      </form>
    </div>
  );
  };

export default RegistrationForm;








