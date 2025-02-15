import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import menuRoutes from './routes/menuRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
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
app.use('/chat',chatRoutes);

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
// });

let isShopOpen = true;

const announcementSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

const Announcement = mongoose.model('Announcement', announcementSchema);

const shopStatusSchema = new mongoose.Schema({
  isOpen: { type: Boolean, required: true, default: true },
});
const ShopStatus = mongoose.model('ShopStatus', shopStatusSchema);
(async () => {
  const statusCount = await ShopStatus.countDocuments();
  if (statusCount === 0) {
    await ShopStatus.create({ isOpen: true }); // Default initial status
  }
})();
app.get('/announcements', async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching announcements' });
  }
});

app.post('/announcements', async (req, res) => {
  console.log("Received request body:", req.body); // Debugging line
  
  const newAnnouncement = new Announcement({
    text: req.body.text,
  });

  try {
    const savedAnnouncement = await newAnnouncement.save();
    res.status(201).json(savedAnnouncement);
  } catch (error) {
    console.error("Error creating announcement:", error); // Log the error
    res.status(400).json({ message: 'Error creating announcement', error });
  }
});

app.delete('/announcements/:id', async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Error deleting announcement' });
  }
});

// app.get('/shop-status', (req, res) => {
//   res.json({ isOpen: isShopOpen });
// });

app.get('/shop-status', async (req, res) => {
  try {
    const shopStatus = await ShopStatus.findOne();
    res.json(shopStatus);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch shop status' });
  }
});
// Toggle shop status (Owner only)
app.post('/shop-status/toggle', async (req, res) => {
  try {
    const shopStatus = await ShopStatus.findOne();
    shopStatus.isOpen = !shopStatus.isOpen;
    await shopStatus.save(); // Persist the updated status
    res.json(shopStatus);
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle shop status' });
  }
});
// app.post('/shop-status/toggle', (req, res) => {
//   const { isOpen } = req.body; // Expecting { "isOpen": true/false } in the request body

//   if (typeof isOpen === 'boolean') {
//     // Set the shop status based on the incoming value
//     isShopOpen = isOpen;
//     res.json({ isOpen: isShopOpen });
//   } else {
//     // Handle case where the request body doesn't contain a valid boolean
//     res.status(400).json({ error: 'Invalid input. Expected a boolean value for isOpen.' });
//   }
// });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});