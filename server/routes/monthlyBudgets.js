import express from 'express';
import _ from 'lodash';
import { MonthlyBudget } from '../models/monthlybudget.js';
const router = express.Router();

// GET /api/monthly-budgets
router.get('/', async (req, res) => {
    const monthlyBudgets = await MonthlyBudget.find({ userId: req.headers['userId'] }).select(['-userId']).sort('month');

    return res.status(200).send(monthlyBudgets);
});

// POST /api/monthly-budgets
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let monthlyBudget = await new MonthlyBudget({
        ..._.pick(req.body, ['month', 'income', 'categories', 'expenses']),
        userId: req.headers['userId']
    }).save();

    return res.status(201).send(_.pick(monthlyBudget, ['_id', 'month', 'income', 'categories', 'expenses']));
});

export default router;