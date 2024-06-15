import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; 
import { readdirSync } from 'fs';
import morgan from 'morgan';
import dotenv from 'dotenv';

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
app.use(cors({
    origin: ["https://connx.vercel.app"],
}));

// Autoload Routes
(async () => {
    const routesPath = './routes';
    try {
        for (const file of readdirSync(routesPath)) {
            const route = await import(`${routesPath}/${file}`);
            app.use('/api', route.default);
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
