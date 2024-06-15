import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import { readdirSync } from 'fs';
import dotenv from 'dotenv';

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

// CORS Configuration
const allowedOrigins = ["https://connx.vercel.app"]; // Specify your allowed origins here
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers
};
app.use(cors(corsOptions));

// Autoload Routes
const routesPath = './routes';
readdirSync(routesPath).forEach(async (file) => {
    if (file.endsWith('.js')) {
        const route = await import(`${routesPath}/${file}`);
        app.use('/api', route.default);
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        console.log(err); // Log the error object
        return res.status(401).json({ error: "Unauthorized" });
    }
    if (err instanceof Error && err.message === 'Not allowed by CORS') {
        return res.status(403).json({ error: 'CORS error' });
    }
    next();
});

// Listen
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running at port ${port}`));
