import mongoose from "mongoose";
import Joi from "joi";

export const User = mongoose.model("User", new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 5,
        maxLength: 255,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
}, {
    timestamps: true,
    versionKey: false
}));

export function validate(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).trim().required(),
        email: Joi.string().min(5).max(255).trim().email().required(),
        password: Joi.string().min(5).max(1024).required()
    });

    return schema.validate(user);
}