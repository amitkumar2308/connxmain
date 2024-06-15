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

// Listen
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running at port ${port}`));

export default app;
