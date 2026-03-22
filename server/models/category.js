import mongoose from "mongoose";
import Joi from "joi";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50,
        trim: true
    },
    budget: {
        type: Number,
        required: true,
        min: 0
    },
    note: {
        type: String,
        maxLength: 255,
        trim: true,
        default: ''
    }
}, {
    _id: false, // important: prevents automatic ObjectId for each category
    timestamps: true,
    versionKey: false
});

function validate(category) {
    const schema = Joi.object({
        name: Joi.string().min(1).max(50).trim().required(),
        budget: Joi.number().min(0).required(),
        note: Joi.string().max(255).trim().allow('', null)
    });

    return schema.validate(category);
}

export const Category = mongoose.model("Category", categorySchema);
export { categorySchema, validate };