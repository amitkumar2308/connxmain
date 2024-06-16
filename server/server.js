import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { readdirSync, existsSync } from "fs";
import path from "path";

require("dotenv").config();

const app = express();

// Middleware
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
app.use(cors({
    origin: "http://connx.vercel.app",  // Update with your actual frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
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
const routesPath = path.join(__dirname, 'routes');
if (existsSync(routesPath)) {
    readdirSync(routesPath).map((routeFile) => {
        if (routeFile.endsWith('.js')) {
            const route = require(`./routes/${routeFile}`);
            app.use('/api', route);
        }
    });
} else {
    console.error(`Error: Directory '${routesPath}' not found.`);
}

// Error handling middleware
app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        console.log(err);
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
});

// Handling 404 errors
app.use((req, res) => {
    res.status(404).send("404 - Not Found");
});

// Listen on port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
