import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Default owner credentials (for demo purposes; hash this in a real scenario)
const ownerCredentials = {
  name: 'vaidik',
  email: 'owner@canteen.com',
  password: 'owner123', // This should ideally be hashed in production
  role: 'owner',
};

// Signin route
router.post('/signin', async (req, res) => {
  const { email, password, role } = req.body; // Ensure role is passed

  console.log(`Received email: ${email}, role: ${role}`);

  try {
    // If the email is for the owner
    if (email === ownerCredentials.email) {
      // Compare password for the owner
      const isPasswordValid = password === ownerCredentials.password; // Simple check; use bcrypt in production
      console.log(`Owner password valid: ${isPasswordValid}`);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials for owner' });
      }

      // Ensure role is 'owner' for owner login
      if (role !== ownerCredentials.role) {
        return res.status(404).json({ message: 'User not found' });
      }

      // If password and role are valid, return owner credentials and token
      const token = jwt.sign(
        { email: ownerCredentials.email, role: ownerCredentials.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.status(200).json({
        user: { name: ownerCredentials.name, role: ownerCredentials.role, photo: 'https://via.placeholder.com/150' },
        token,
      });
    }

    // For regular user login
    const user = await User.findOne({ email });
    console.log(`Found user: ${user}`);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare password for regular user
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(`User password valid: ${isPasswordValid}`);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Ensure role matches the user's role
    if (role !== user.role) {
      return res.status(403).json({ message: 'Role mismatch. Please select the correct role.' });
    }

    // Generate JWT token after successful login
    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return user info and token
    return res.status(200).json({
      user: { name: user.name, role: user.role, photo: user.photo || 'https://via.placeholder.com/150' },
      token,
    });

  } catch (error) {
    console.error('Error during signin:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'customer', // Default to 'customer' if no role is provided
    });

    // Save the user to the database
    await user.save();

    // Send a success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
export default router;
