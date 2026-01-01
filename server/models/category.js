import mongoose from "mongoose";

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

export const Category = mongoose.model("Category", categorySchema);
export { categorySchema };