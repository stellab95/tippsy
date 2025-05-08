import express from 'express';
import pool from '../db.js';
import multer from 'multer';

const router = express.Router();
// const upload = multer({ dest: 'uploads/' });

// ROUTES USERS
router.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erreur dans /users :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.post('/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const result = await pool.query(
      `INSERT INTO users (username, email, password)
       VALUES ($1, $2, $3)
       RETURNING username, email, password`,
      [username, email, password]
    );
        res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erreur dans /users :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.put('/users/:id', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const { id } = req.params;
    
    const result = await pool.query(
     `UPDATE users SET username = $1, email = $2, password = $3
      WHERE id = $4
      RETURNING username, email, password`,
      [username, email, password, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Erreur dans /users/:id :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM users WHERE id = $1 RETURNING id`,
      [id]
);
    res.status(200).json(result.rows[0].id );
  } catch (error) {
    console.error('Erreur dans /users/:id :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


// ROUTES POSTS
router.get('/posts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erreur dans /posts :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post non trouvé' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Erreur dans GET /posts/:id :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


router.post('/posts', async (req, res) => {
  try {
    const { title, content, image, user_id } = req.body;

    const userIdInt = parseInt(user_id, 10)
    if (isNaN(userIdInt)) {
      return res.status(400).json({ error: 'user_id invalide' })
    }

    const result = await pool.query(
      `INSERT INTO posts (title, content, image, user_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, content, image, userIdInt]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Erreur dans /posts :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.put('/posts/:id', async (req, res) => {
  try {
    const { title, content, image, user_id } = req.body;
    const { id } = req.params;
    
    const result = await pool.query(
     `UPDATE posts SET title = $1, content = $2, image = $3, user_id = $4
      WHERE id = $5
      RETURNING *`,
      [title, content, image, user_id, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Erreur dans /posts/:id :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});
  
router.delete('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM posts WHERE id = $1 RETURNING id`,
      [id]
);
    res.status(200).json(result.rows[0].id );
  } catch (error) {
    console.error('Erreur dans /posts/:id :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


// ROUTE UPLOAD
import path from 'path';

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage })

router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Aucun fichier reçu' });
  }

  res.status(200).json({ file: req.file });
});


export default router;
