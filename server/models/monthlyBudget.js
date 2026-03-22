import mongoose from "mongoose";
import { categorySchema } from "./Category.js";
import { expenseSchema } from "./Expense.js";
import Joi from "joi";

export const MonthlyBudget = mongoose.model("MonthlyBudget", new mongoose.Schema({
    month: {
        type: String, // "YYYY-MM"
        required: true,
        match: /^\d{4}-(0[1-9]|1[0-2])$/
    },
    income: {
        type: Number,
        required: true,
        min: 0
    },
    categories: {
        type: [categorySchema],
        required: true,
        default: []
    },
    expenses: {
        type: [expenseSchema],
        required: true,
        default: []
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
},
    {
        timestamps: true,
        versionKey: false
    }
));

export function validate(monthlyBudget) {
    const schema = Joi.object({
        month: Joi.string().pattern(/^\d{4}-(0[1-9]|1[0-2])$/).required(),
        income: Joi.number().min(0).required(),
        categories: Joi.array().items(Joi.object({
            name: Joi.string().trim().required(),
            budget: Joi.number().min(0).required(),
            note: Joi.string().trim().allow('', null)
        })).required(),
        expenses: Joi.array().items(Joi.object({
            category: Joi.string().min(1).max(50).trim().required(),
            amount: Joi.number().min(0).required(),
            date: Joi.date(),
            note: Joi.string().max(255).trim().allow('', null)
        })).required(),
        userId: Joi.objectId()
    });

    return schema.validate(monthlyBudget);
}