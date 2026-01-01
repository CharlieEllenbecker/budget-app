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
        required: true,
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

const Expense = mongoose.model("Expense", expenseSchema);

module.exports.Expense = Expense;
module.exports.expenseSchema = expenseSchema;