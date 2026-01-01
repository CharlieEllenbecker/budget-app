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
    _id: false, // important: prevents automatic ObjectId for each category
    versionKey: false
});

const Category = mongoose.model("Category", categorySchema);

module.exports.categorySchema = categorySchema;
module.exports.Category = Category;