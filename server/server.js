import express from 'express';
import mongoose from 'mongoose';
import { readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';



import User from "../server/models/user.js";
import { hashPassword,comparePassword } from "../server/helpers/auth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {nanoid} from 'nanoid';



dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://connx.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204); // Pre-flight request response
  }
  next();
});

// MongoDB Connection
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

// Load Routes dynamically
const routePath = join(__dirname, 'routes');
const routeFiles = readdirSync(routePath);

routeFiles.forEach(async (file) => {
  if (file.endsWith('.js')) {
    try {
      const module = await import(join(routePath, file));
      if (module.default) {
        app.use('/api', module.default);
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



router.post("/register", register);
export const register = async (req, res) => {
  const { username, email, password, confirmpassword } = req.body;
  // validation
  if (!username) return res.status(400).json({ error: "Username is Required" });
  if (!email) return res.status(400).json({ error: "Email is Required" });
  if (!password || password.length < 6)
    return res.status(400).json({ error: "Password should be 6 characters long" });
  if (password !== confirmpassword) return res.status(400).json({ error: "Password and Confirm Password doesn't match" });
  // check if user already exists
  const exist = await User.findOne({ email });
  if (exist) return res.status(400).json({ error: "Email already exists" }); // send msg if email already exists

  // hashed password
  const hashedPassword = await hashPassword(password);
  const user = new User({ username, email, password: hashedPassword, name: nanoid(6) });
  try {
      await user.save();
      console.log("Registered User =>", user);
      return res.json({ ok: true });
  } catch (error) {
      console.log("REGISTRATION FAILED =>", error);
      return res.status(400).json({ error: "Registration failed. Please try again later." });
  }
};


// for login

router.post("/login", login);
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //*Check if our database has user with that username
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("user Does not exist");

    //check password
    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).send("Incorrect Credentials");

    // create a jwt token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    }); // to create sign token

    // we are not saving user password and secret
    user.password = undefined;
    user.secret = undefined;

    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log("ERROR WHILE LOGIN =>", err);
    return res.status(400).send("Error, Try again");
  }
};


export const currentUser = async(req,res)=>{
    //console.log(req.auth);
    try {
        const user = await User.findById(req.auth._id);
        res.json({ok:true}); 
    } catch (error) {
        console.log("Error while verifiying token =>",error);
        res.sendStatus(400);
    }
}

// Listen
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running at port ${port}`));

export default app;
