import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { readdirSync } from "fs";

const morgan = require("morgan");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
app.use(cors({
    origin: "http://connx.vercel.app",  // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"],  // Allow these methods
    allowedHeaders: ["Content-Type", "Authorization"],  // Allow these headers
}));

// Database connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log("Database connected"))
  .catch((err) => console.log("DB connection error =>", err));

// Autoload Routes
readdirSync('./routes').map((routeFile) => {
    if (routeFile.endsWith('.js')) {
        const route = require(`./routes/${routeFile}`);
        app.use('/api', route);
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        console.log(err);
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
});

// Listen on port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
