import express from 'express';
import mongoose from 'mongoose';
import { setupRoutes } from './startup/routes.js';
import { validate } from './startup/validate.js';
const app = express();

// Routes
setupRoutes(app);

// ObjectId Validation
validate();

// Database
mongoose
    .connect('mongodb://localhost/budget-app')
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});