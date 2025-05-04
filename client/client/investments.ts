import express from 'express';
import Investment from '../models/Investment.ts'
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { amount, yearlyContribution, expectedReturn, duration, yearlyResults } = req.body;
    const newInvestment = new Investment({
      amount,
      yearlyContribution,
      expectedReturn,
      duration,
      yearlyResults,
    });

    await newInvestment.save();
    res.status(201).json(newInvestment);
  } catch (err) {
    console.error('Failed to save investment', err);
    res.status(500).json({ error: 'Failed to save investment' });
  }
});

export default router;
