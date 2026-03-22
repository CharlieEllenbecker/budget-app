import express from 'express';
import _ from 'lodash';
import { User, validate } from '../models/User.js';
const router = express.Router();

// POST /api/users
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = await new User(_.pick(req.body, ['name', 'email', 'password'])).save();

    return res.status(201).send(_.pick(user, ['_id', 'name', 'email']));
});

export default router;