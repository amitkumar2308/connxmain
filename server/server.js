import express from 'express';
import mongoose from 'mongoose';
import { readdirSync } from 'fs'; // Use fs/promises for modern syntax
import morgan from 'morgan';
import dotenv from 'dotenv';
import allowCors from './allowCors.js'; // Adjust path as necessary

dotenv.config();

const app = express();

// Database connection
mongoose.connect(process.env.DATABASE)
    .then(() => console.log("Database connected"))
    .catch((err) => console.log("DB connection error =>", err));

// Middlewares
app.use(morgan('dev'));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use(allowCors);

// Autoload Routes
(async () => {
    const routesPath = './routes';
    try {
        const files = await readdirSync(routesPath);
        for (const file of files) {
            if (file.endsWith('.js')) {
                const route = await import(`${routesPath}/${file}`);
                app.use('/api', route.default);
            }
        }
    } catch (err) {
        console.error(`Error loading routes: ${err.message}`);
    }
})();

// Error handling middleware
app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        console.log(err); // Log the error object
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
});

// Listen
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running at port ${port}`));
