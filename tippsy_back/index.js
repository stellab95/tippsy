import dotenv from 'dotenv'
dotenv.config()
import session from 'express-session';
import path from 'path';
import cors from 'cors';
import pool from './db.js'
import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import myRouter from './routes/myRouter.js';


const app = express()
const port = process.env.PORT || 3000

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
      secure: true,
      httpOnly: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24,
    }
}));

app.use(express.json())
app.use(
  cors(
     {
      credentials: true,
      origin: ['http://localhost:5173', 'https://tippsy-front.vercel.app'],
      methods: ["GET", "POST", "PUT", "DELETE"],
     }
 )); 


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get('/', (req, res) => {
  res.send('Bienvenue sur Tippsy ! 🎨');
});

// Sert les fichiers statiques depuis "public"
app.use(express.static(path.join(__dirname, 'public')));
app.use(myRouter);
app.use('/uploads', express.static('uploads'))
app.use((req, res) => {
  res.status(404).send(`Route non trouvée : ${req.method} ${req.originalUrl}`);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
