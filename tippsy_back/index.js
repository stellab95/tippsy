import dotenv from 'dotenv'
dotenv.config()

import path from 'path';
import cors from 'cors';
import pool from './db.js'
import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import myRouter from './routes/myRouter.js';


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(
  cors(
     {
     origin: 'http://localhost:5173',
     methods: ["GET", "POST", "PUT", "DELETE"],
     }
 )); 


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Sert les fichiers statiques depuis "public"
app.use(express.static(path.join(__dirname, 'public')));
app.use(myRouter);
app.use('/uploads', express.static('uploads')) 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
