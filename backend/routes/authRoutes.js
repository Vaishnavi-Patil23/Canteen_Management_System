import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Default owner credentials
const ownerCredentials = {
  email: 'owner@canteen.com',
  password: 'owner123', // Hash this in real scenario
  role: 'owner',
};

// Signup route
router.post('/signup', async (req, res) => {
  const { email, password, role } = req.body;

  // Prevent signup as owner
  if (role === 'owner') {
    return res.status(400).json({ message: 'Cannot signup as owner' });
  }

  // Hash password and save user
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = new User({ email, password: hashedPassword, role });

  try {
    await newUser.save();
    res.status(201).json({ message: 'Signup successful. Please sign in.' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user.' });
  }
});

// Signin route
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  // Check for owner credentials
  if (email === ownerCredentials.email && password === ownerCredentials.password) {
    // Owner login
    const token = jwt.sign({ email, role: 'owner' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ token, role: 'owner' });
  }

  // Find user and verify credentials
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ token, role: user.role });
});

export default router;
