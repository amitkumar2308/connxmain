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

// Database
mongoose
  .connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('DB connection error =>', err));

// Middlewares
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Load Routes dynamically
const routePath = join(__dirname, 'routes');
const routeFiles = readdirSync(routePath);

routeFiles.forEach((file) => {
  import(`file://${join(routePath, file)}`).then(({ default: route }) => {
    app.use('/api', route);
  }).catch((err) => console.error(`Error loading route ${file}:`, err));
});

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    console.log(err);
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});

// Default route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running at port ${port}`));

export default app;
