import express from 'express';
import _ from 'lodash';
import { Category, validate } from '../models/Category.js';
const router = express.Router();

// GET /api/categories
router.get('/', async (req, res) => {
    const categories = await Category.distinct('name');
    return res.status(200).send(categories);
});

// POST /api/categories
router.post('/', express.json(), async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let category = await new Category({
        ..._.pick(req.body, ['name', 'budget', 'note'])
    }).save();

    return res.status(201).send(category);
});

export default router;