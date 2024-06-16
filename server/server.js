// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; 
import morgan from 'morgan';
import dotenv from 'dotenv';
import routes from './routes'; // Import routes using ES modules

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

// CORS configuration
const allowedOrigins = [
    'https://connx.vercel.app', // Add more origins as needed
];
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true, // Required for cookies, authorization headers with HTTPS
}));

// Routes
app.use('/api', routes); // Use the imported routes

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
