import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    month: {
        type: String, // "YYYY-MM"
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
    note: {
        type: String,
        trim: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export const Expense = mongoose.model("Expense", expenseSchema);
export { expenseSchema };