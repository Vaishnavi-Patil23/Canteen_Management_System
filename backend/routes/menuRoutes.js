// routes/menuRoutes.js
import express from 'express';
import Menu from '../models/Menu.js';
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.status(200).json(menuItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/', async (req, res) => {
  const { name, price, available } = req.body;
  try {
    const newMenu = new Menu({ name, price, available });
    const savedItem = await newMenu.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Menu.findByIdAndDelete(id); 
    res.status(204).send(); // 
  } catch (error) {
    res.status(500).send('Error deleting item');
  }
});

router.put('/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const { name, price, available } = req.body;
      const updatedItem = await Menu.findByIdAndUpdate(
          id,
          { name, price, available },
          { new: true } 
      );
      if (!updatedItem) {
          return res.status(404).json({ message: 'Item not found' });
      }
      res.status(200).json(updatedItem);
  } catch (err) {
      res.status(500).json({ message: 'Error updating the item', error: err });
  }
});
export default router;
