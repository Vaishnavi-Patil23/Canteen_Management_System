import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'; // For environment variables
dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose
    .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/canteen_ms", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
