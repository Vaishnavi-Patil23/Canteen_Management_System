import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();
const ownerCredentials = {
  name: 'vaidik',
  email: 'owner@canteen.com',
  password: 'owner123',
  role: 'owner',
};

router.post('/signin', async (req, res) => {
  const { email, password, role } = req.body; 

  console.log(`Received email: ${email}, role: ${role}`);

  try {
    if (email === ownerCredentials.email) {
      const isPasswordValid = password === ownerCredentials.password; 
      console.log(`Owner password valid: ${isPasswordValid}`);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials for owner' });
      }

      if (role !== ownerCredentials.role) {
        return res.status(404).json({ message: 'User not found' });
      }
      const token = jwt.sign(
        { email: ownerCredentials.email, role: ownerCredentials.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      return res.status(200).json({
        user: { name: ownerCredentials.name, role: ownerCredentials.role, photo: 'https://via.placeholder.com/150' },
        token,
      });
    }
    const user = await User.findOne({ email });
    console.log(`Found user: ${user}`);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(`User password valid: ${isPasswordValid}`);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (role !== user.role) {
      return res.status(403).json({ message: 'Role mismatch. Please select the correct role.' });
    }

    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      user: { name: user.name, role: user.role, photo: user.photo || 'https://via.placeholder.com/150',userId: user._id, },
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
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'customer',
    });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
export default router;