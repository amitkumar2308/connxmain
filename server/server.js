import express from 'express';
import mongoose from 'mongoose';
import { readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import cors from 'cors';

// Import User model and helper functions
import User from "../models/user.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import jwt from "jsonwebtoken";
import { nanoid } from 'nanoid';
import { sendTokenEmail } from "./emailconfig.js";

dotenv.config();

// Initialize Express application
const app = express();

// Middleware
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
  origin: 'https://connx.vercel.app',
  credentials: true,
}));

// MongoDB Connection
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

// Load Routes dynamically
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const routePath = join(__dirname, 'routes');
const routeFiles = readdirSync(routePath);

routeFiles.forEach(async (file) => {
  if (file.endsWith('.js')) {
    try {
      const { default: routes } = await import(join(routePath, file));
      if (routes) {
        app.use('/api', routes); // Mount routes under /api prefix
      } else {
        console.error(`No default export found in ${file}`);
      }
    } catch (err) {
      console.error(`Failed to load route file ${file}`, err);
    }
  }
});

// Error handling middleware (must be placed after all routes and middleware)
app.use((err, req, res, next) => {
  console.error(err);
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return res.status(500).json({ error: 'Internal Server Error' });
});

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Register route
app.post('/api/register', async (req, res) => {
  const { username, email, password, confirmpassword } = req.body;
  // validation
  if (!username) return res.status(400).json({ error: "Username is Required" });
  if (!email) return res.status(400).json({ error: "Email is Required" });
  if (!password || password.length < 6)
    return res.status(400).json({ error: "Password should be 6 characters long" });
  if (password !== confirmpassword) return res.status(400).json({ error: "Password and Confirm Password doesn't match" });
  // check if user already exists
  const exist = await User.findOne({ email });
  if (exist) return res.status(400).json({ error: "Email already exists" });

  // hashed password
  const hashedPassword = await hashPassword(password);
  const newUser = new User({ username, email, password: hashedPassword, name: nanoid(6) });

  try {
    await newUser.save();
    console.log("Registered User =>", newUser);
    return res.json({ ok: true });
  } catch (error) {
    console.log("REGISTRATION FAILED =>", error);
    return res.status(400).json({ error: "Registration failed. Please try again later." });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User does not exist");

    // Validate password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) return res.status(400).send("Incorrect password");

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Remove sensitive information
    user.password = undefined;
    user.secret = undefined;

    res.json({ token, user });
  } catch (error) {
    console.log("ERROR WHILE LOGIN =>", error);
    return res.status(400).send("Error, please try again");
  }
});

// Current user route
app.get('/api/current-user', async (req, res) => {
  try {
    const user = await User.findById(req.auth._id);
    res.json({ user });
  } catch (error) {
    console.log("Error while verifying token =>", error);
    res.sendStatus(400);
  }
});

// Listen
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running at port ${port}`));

export default app;
