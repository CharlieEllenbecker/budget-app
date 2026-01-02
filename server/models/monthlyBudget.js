import mongoose from "mongoose";
import { categorySchema } from "./category.js";
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
    }
},
    {
        timestamps: true,
        versionKey: false
    }
));

export function validateMonthlyBudget(monthlyBudget) {
    const schema = Joi.object({
        month: Joi.string().pattern(/^\d{4}-(0[1-9]|1[0-2])$/).required(),
        income: Joi.number().min(0).required(),
        categories: Joi.array().items(Joi.object({
            name: Joi.string().trim().required(),
            budget: Joi.number().min(0).required(),
            note: Joi.string().trim().allow('', null)
        })).required()
    });

    return schema.validate(monthlyBudget);
}