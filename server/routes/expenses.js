import express from 'express';
import { Expense } from '../models/expense.js';
const router = express.Router();

// GET /api/expenses
router.get('/', async (req, res) => {
    const expenses = await Expense.find().sort({ date: -1 });
    return res.status(200).send(expenses);
});

// POST /api/expenses
router.post('/', express.json(), async (req, res) => {
    const { month, category, amount, date, note } = req.body;
    const expense = new Expense({ month, category, amount, date, note });
    await expense.save();
    return res.status(201).send(expense);
});

export default router;