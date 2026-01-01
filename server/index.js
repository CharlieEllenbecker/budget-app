import express from 'express';
import mongoose from 'mongoose';

import { Expense } from './models/expense.js';
import { Category } from './models/category.js';
import { MonthlyBudget } from './models/monthlybudget.js';

const app = express();

// GET /api/expenses
app.get('/api/expenses', async (req, res) => {
    const expenses = await Expense.find().sort({ date: -1 });
    return res.status(200).send(expenses);
});

// POST /api/expenses
app.post('/api/expenses', express.json(), async (req, res) => {
    const { month, category, amount, date, note } = req.body;
    const expense = new Expense({ month, category, amount, date, note });
    await expense.save();
    return res.status(201).send(expense);
});

// GET /api/categories
app.get('/api/categories', async (req, res) => {
    const categories = await Expense.distinct('category');
    return res.status(200).send(categories);
});

// POST /api/categories
app.post('/api/categories', express.json(), async (req, res) => {
    const { name, budget, note } = req.body;
    const category = new Category({ name, budget, note });
    await category.save();
    return res.status(201).send(category);
});

// GET /api/monthly-budgets
app.get('/api/monthly-budgets', async (req, res) => {
    const budgets = await MonthlyBudget.find().sort({ month: -1 });
    return res.status(200).send(budgets);
});

// POST /api/monthly-budgets
app.post('/api/monthly-budgets', express.json(), async (req, res) => {
    const { month, income, categories } = req.body;
    const monthlyBudget = new MonthlyBudget({ month, income, categories });
    await monthlyBudget.save();
    return res.status(201).send(monthlyBudget);
});

// Database
mongoose
    .connect('mongodb://localhost/budget-app')
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});