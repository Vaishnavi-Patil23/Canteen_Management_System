import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate for redirection

const Signup = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer', 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Signup successful! Please login.');
      
        navigate('/signin');
      } else {
        alert(data.message || 'Error signing up.');
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <>
      <style>
        {`
          .login-container, .signup-container {
            width: 300px;
            margin: 50px auto;
            padding: 30px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f9f9f9;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          }

          h2 {
            text-align: center;
            margin-bottom: 20px;
            font-size: 24px;
            color: #333;
          }

          form div {
            margin-bottom: 15px;
          }

          label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            font-size: 14px;
            color: #555;
          }

          input[type="text"], input[type="email"], input[type="password"], select {
            width: 100%;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 14px;
          }

          button {
            width: 100%;
            padding: 10px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
          }

          button:hover {
            background-color: #45a049;
          }

          p {
            text-align: center;
            margin-top: 15px;
            font-size: 14px;
          }

          a {
            color: #4CAF50;
            text-decoration: none;
          }

          a:hover {
            text-decoration: underline;
          }

          .status-box {
            cursor: pointer;
            padding: 5px 10px;
            border-radius: 5px;
            color: white;
            display: inline-block;
          }

          .status-box.open {
            background-color: lightgreen;
          }

          .status-box.close {
            background-color: lightcoral;
          }
        `}
      </style>

      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={signupData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={signupData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={signupData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={signupData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Role:</label>
            <select name="role" value={signupData.role} onChange={handleChange}>
              <option value="customer">Customer</option>
            </select>
          </div>
          <button type="submit">Sign Up</button>
        </form>

        <p>Already have an account? <Link to="/signin">Login Here</Link></p>
      </div>
    </>
  );
};

export default Signup;
