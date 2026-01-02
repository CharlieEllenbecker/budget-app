import express from 'express';
import { MonthlyBudget } from '../models/monthlybudget.js';
const router = express.Router();

// GET /api/monthly-budgets
router.get('/', async (req, res) => {
    const budgets = await MonthlyBudget.find().sort({ month: -1 });
    return res.status(200).send(budgets);
});

// POST /api/monthly-budgets
router.post('/', express.json(), async (req, res) => {
    const { month, income, categories } = req.body;
    const monthlyBudget = new MonthlyBudget({ month, income, categories });
    await monthlyBudget.save();
    return res.status(201).send(monthlyBudget);
});

export default router;