import express from 'express';
import mongoose from 'mongoose';
import { readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Database connection
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
  } catch (error) {
    console.error('DB connection error:', error);
  }
};

connectToDatabase();

// Middlewares
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS configuration (if necessary)
// Vercel handles CORS headers automatically, so this might not be needed
// Remove this if not necessary or configure in Vercel dashboard
/*
const corsConfig = {
  origin: '*',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.options('*', cors(corsConfig));
app.use(cors(corsConfig));
*/

// Load Routes dynamically
const routePath = join(__dirname, 'routes');
const routeFiles = readdirSync(routePath);

routeFiles.forEach(async (file) => {
  if (file.endsWith('.js')) {
    const { default: route } = await import(`file://${join(routePath, file)}`);
    app.use('/api', route);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    console.error(err);
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Server listening
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

export default app;
