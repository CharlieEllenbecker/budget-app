import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 256,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
}, { versionKey: false });

const User = mongoose.model("User", userSchema);

module.exports.User = User;
module.exports.userSchema = userSchema;