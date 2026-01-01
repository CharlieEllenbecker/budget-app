import mongoose from "mongoose";
import { categorySchema } from "./category.js";

const monthlyBudgetSchema = new mongoose.Schema({
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

export const MonthlyBudget = mongoose.model("MonthlyBudget", monthlyBudgetSchema);
export { monthlyBudgetSchema };