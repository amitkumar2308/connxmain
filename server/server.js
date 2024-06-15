import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Database connection
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Database connected'))
.catch((err) => console.log('DB connection error =>', err));

// Middlewares
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const corsConfig = {
  origin: '*',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.options('*', cors(corsConfig));
app.use(cors(corsConfig));

// Load Routes dynamically
const routePath = join(__dirname, 'routes');
const routeFiles = readdirSync(routePath);

routeFiles.forEach((file) => {
  if (file.endsWith('.js')) {
    import(join(routePath, file)).then(module => {
      app.use('/api', module.default);
    }).catch(err => {
      console.error(`Failed to load route file ${file}`, err);
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    console.log(err);
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/login', (req, res) => {
  res.send('Hello Login!');
});

// Listen
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running at port ${port}`));

export default app;
