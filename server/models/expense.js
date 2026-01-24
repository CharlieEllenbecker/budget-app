import mongoose from "mongoose";
import Joi from "joi";

const expenseSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50,
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
        maxLength: 255,
        trim: true,
        default: ''
    }
}, {
    _id: false, // important: prevents automatic ObjectId for each expense
    timestamps: true,
    versionKey: false
});

function validate(expense) {
    const schema = Joi.object({
        month: Joi.string().pattern(/^\d{4}-(0[1-9]|1[0-2])$/).required(),
        category: Joi.string().minLength(1).maxLength(50).trim().required(),
        amount: Joi.number().min(0).required(),
        date: Joi.date(),
        note: Joi.string().maxLength(255).trim().allow('', null)
    });

    return schema.validate(expense);
}

export const Expense = mongoose.model("Expense", expenseSchema);
export { expenseSchema, validate };