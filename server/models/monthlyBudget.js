import mongoose from "mongoose";
import { categorySchema } from "./category.js";

const budgetSchema = new mongoose.Schema({
    month: {
        type: String, // "YYYY-MM"
        required: true
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
);

const MonthlyBudget = mongoose.model("MonthlyBudget", budgetSchema);

module.exports.MonthlyBudget = MonthlyBudget;
module.exports.budgetSchema = budgetSchema;