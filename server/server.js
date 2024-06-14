import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { readdirSync } from 'fs';
import { fileURLToPath } from 'url'; // Import fileURLToPath function from url module
import { dirname, join } from 'path'; // Import dirname and join functions from path module
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url); // Convert the URL to a file path
const __dirname = dirname(__filename); // Get the directory name

const app = express();

// Database
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('DB connection error =>', err));

// Middlewares
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

const corsConfig = {
  origin: "*",
  credential:true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
}
app.options("",cors(corsConfig));
app.use(cors(corsConfig));

// Load Routes dynamically
const routePath = join(__dirname, 'routes'); // Get the path to the routes directory
const routeFiles = readdirSync(routePath);

routeFiles.forEach(async (file) => {
  const { default: route } = await import(`file://${join(routePath, file)}`); // Import the route using file:// URL scheme
  app.use('/api', route); // Mount the route
});

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    console.log(err);
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});

// Listen
const port = process.env.PORT || 8000;

app.use("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => console.log(`Server is running at port ${port}`));
