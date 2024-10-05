import express from 'express';
import mongoose from 'mongoose';
// const cors = require('cors');
import dotenv from 'dotenv'; // For environment variables
dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// app.use(bodyParser.json()); // Parse incoming JSON requests
// app.use(cors()); // Enable CORS for all origins

import addMenuRoute from './routes/Addmenu.js';
import getMenuRoute from './routes/getMenu.js';
mongoose
    .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/canteen_ms")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use(addMenuRoute);
app.use(getMenuRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
