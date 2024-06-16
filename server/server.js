import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; 
import { readdirSync, statSync } from 'fs';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();

// Database connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Database connected"))
.catch((err) => console.log("DB connection error =>", err));

// Middlewares
app.use(morgan('dev'));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ["http://connx.vercel.app"],
}));

// Autoload Routes
const routesDirectory = './routes'; // Define the routes directory path

try {
    if (statSync(routesDirectory).isDirectory()) {
        readdirSync(routesDirectory).forEach(async (file) => {
            const route = await import(path.join(__dirname, routesDirectory, file));
            app.use('/api', route.default);
        });
    } else {
        console.log(`${routesDirectory} is not a directory.`);
    }
} catch (err) {
    console.error(`Error reading directory '${routesDirectory}':`, err);
}

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
