import express from 'express';
import Investment from '../models/Investment';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newInvestment = new Investment(req.body);
    await newInvestment.save();
    res.status(201).json({ message: 'Investment saved successfully' });
  } catch (err) {
    console.error('❌ Error saving investment:', err);
    res.status(500).json({ error: 'Failed to save investment' });
  }
});

export default router;
