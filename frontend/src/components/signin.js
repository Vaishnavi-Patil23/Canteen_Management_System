import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    role: 'customer', // Default role set to 'customer'
  });

  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch('http://localhost:3000/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: loginData.email,
                password: loginData.password,
                role:loginData.role,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            const { name, role, photo, userId } = data.user;

            // Store user info in localStorage
            localStorage.setItem('userName', name);
            localStorage.setItem('userRole', role);
            localStorage.setItem('userPhoto', photo || 'https://via.placeholder.com/150');
            localStorage.setItem('userId', userId);

            console.log('User ID stored in localStorage:', localStorage.getItem('userId'));

            // Redirect based on user role
            if (role === 'owner') {
                navigate('/owner-home'); // Redirect to owner home page
            } else {
                navigate('/customer-home'); // Redirect to customer home page
            }
        } else {
            alert(data.message || 'Login failed!');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again later.');
    }
};

  return (
    <>
      <style>{`
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f2f2f2;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .login-box {
          background-color: #fff;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          text-align: center;
          width: 400px;
        }

        h2 {
          margin-bottom: 20px;
          font-size: 24px;
          color: #333;
        }

        .input-group {
          margin-bottom: 15px;
          text-align: left;
        }

        .input-group label {
          display: block;
          font-size: 14px;
          margin-bottom: 5px;
          color: #555;
        }

        .input-group input,
        .input-group select {
          width: 100%;
          padding: 10px;
          font-size: 14px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .login-btn {
          width: 100%;
          padding: 12px;
          background-color: #ff6347;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
        }

        .login-btn:hover {
          background-color: #ff4500;
        }

        .signup-link {
          margin-top: 20px;
        }

        .signup-link p {
          font-size: 14px;
          color: #555;
        }

        .signup-link a {
          color: #ff6347;
          text-decoration: none;
          font-weight: bold;
        }

        .signup-link a:hover {
          color: #ff4500;
        }
      `}</style>

      <div className="login-container">
        <div className="login-box">
          <h2>Welcome to Be Foodie</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Role</label>
              <select name="role" value={loginData.role} onChange={handleChange}>
                <option value="customer">Customer</option>
                <option value="owner">Owner</option>
              </select>
            </div>
            <button type="submit" className="login-btn">Login</button>
          </form>

          <div className="signup-link">
            <p>Don't have an account?</p>
            <Link to="/signup">Sign up here</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
