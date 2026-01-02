import express from 'express';
import expensesRouter from '../routes/expenses.js';
import monthlyBudgetsRouter from '../routes/monthlyBudgets.js';
import categoriesRouter from '../routes/categories.js';

export function setupRoutes(app) {
    app.use(express.json());
    app.use('/api/expenses', expensesRouter);
    app.use('/api/monthly-budgets', monthlyBudgetsRouter);
    app.use('/api/categories', categoriesRouter);
}