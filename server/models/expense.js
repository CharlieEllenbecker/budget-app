import mongoose from "mongoose";

export const Expense = mongoose.model("Expense", new mongoose.Schema({
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
}));

export function validate(expense) {
    const schema = Joi.object({
        month: Joi.string().pattern(/^\d{4}-(0[1-9]|1[0-2])$/).required(),
        category: Joi.string().trim().required(),
        amount: Joi.number().min(0).required(),
        date: Joi.date(),
        note: Joi.string().trim().allow('', null)
    });

    return schema.validate(expense);
}