import express from 'express';
import MenuItem from '../models/Menu.js'; // Adjust the path if necessary

const router = express.Router();

router.get('/api/menu', async (req, res) => {
    try {
        const menuItems = await MenuItem.find(); // Fetch all items from the Menu collection
        res.status(200).json(menuItems);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch menu items' });
    }
});
export default router;