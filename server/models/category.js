import mongoose from "mongoose";
import Joi from "joi";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    budget: {
        type: Number,
        required: true,
        min: 0
    },
    note: {
        type: String,
        trim: true
    }
}, {
    _id: false, // important: prevents automatic ObjectId for each category
    versionKey: false
});

function validateCategory(category) {
    const schema = Joi.object({
        name: Joi.string().trim().required(),
        budget: Joi.number().min(0).required(),
        note: Joi.string().trim().allow('', null)
    });

    return schema.validate(category);
}

export const Category = mongoose.model("Category", categorySchema);
export { categorySchema, validateCategory };