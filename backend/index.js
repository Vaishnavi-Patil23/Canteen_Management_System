import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import menuRoutes from './routes/menuRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv'; // For environment variables
dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(cors()); // Enable CORS for all origins


mongoose
    .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/canteen_ms")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

app.use('/auth', authRoutes);
app.use('/menu',menuRoutes);
app.use('/orders',orderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
