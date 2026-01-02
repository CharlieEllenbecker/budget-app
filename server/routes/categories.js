import express from 'express';
import { Category } from '../models/category.js';
const router = express.Router();

// GET /api/categories
router.get('/', async (req, res) => {
    const categories = await Category.distinct('category');
    return res.status(200).send(categories);
});

// POST /api/categories
router.post('/', express.json(), async (req, res) => {
    const { name, budget, note } = req.body;
    const category = new Category({ name, budget, note });
    await category.save();
    return res.status(201).send(category);
});

export default router;