import express from 'express';
import pool from '../db.js';
import multer from 'multer';
import bcrypt from 'bcryptjs'
import path from 'path';
import jwt from 'jsonwebtoken'
import verifyToken from '../middlewares/auth.js';
import { error } from 'console';


const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || 'monsecret';

// const upload = multer({ dest: 'uploads/' });
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage })


// ROUTES USERS
router.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id DESC LIMIT 4');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erreur dans /users :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.get('/users/me', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      'SELECT id, username, avatar, cover, biography FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Erreur dans GET /users/me :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('SELECT id, username, avatar, cover, biography FROM users WHERE id = $1', [id])
  
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé" })
    }

    res.status(200).json(result.rows[0])
  } catch (error) {
    console.error("Erreur dans GET/users/:id", error)
    res.status(500).json({ error: "Erreur serveur"})
  }
})

router.get('/users/:id/posts', async (req, res) => {
  const { id } = req.params;

  const targetUserId = parseInt(id, 10);
  if (isNaN(targetUserId)) {
    return res.status(400).json({ error: 'ID invalide' });
  }

  try {
    const result = await pool.query(
      `SELECT posts.*, users.username, users.avatar
        FROM posts
        JOIN users ON posts.user_id = users.id
        WHERE posts.user_id = $1
        ORDER BY posts.created_at DESC`,
      [targetUserId]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erreur dans /users/:id/posts :', error);
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

router.put('/users/:id/account', async (req, res) => {
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

router.put('/users/:id', verifyToken, upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'cover', maxCount: 1 }
]), async (req, res) => {
  try {
    const { id } = req.params
    const { biography } = req.body

  const avatarPath = req.files['avatar'] ? req.files['avatar'][0].filename : null    
  const coverPath = req.files['cover'] ? req.files['cover'][0].filename : null   
  console.log("FILES REÇUS :", req.files)
console.log("BODY :", req.body)

  const result = await pool.query(`
    UPDATE users
    SET avatar = COALESCE($1, avatar),
        cover = COALESCE($2, cover),
        biography = COALESCE($3, biography)
        WHERE id = $4
        RETURNING id, avatar, cover, biography`,
      [avatarPath, coverPath, biography, id])

      res.status(200).json(result.rows[0])
  } catch (error) {
    console.error ('Erreur dans PUT /users/:id', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

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


router.post('/posts', verifyToken, async (req, res) => {
  const userId = req.user.id
  
  try {
    const { title, content, image} = req.body;

    const result = await pool.query(
      `INSERT INTO posts (title, content, image, user_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, content, image, userId]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Erreur dans /posts :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.put('/posts/:id', verifyToken, async (req, res) => {
  console.log("REQ", req.params)
  
  try {
    const { title, content, image} = req.body;
    const { id } = req.params;
    console.log("id", id)
    const userId = req.user.id

    const post = await pool.query(
      `SELECT * FROM posts WHERE id = $1 AND user_id = $2`,
      //[id]
      [id, userId]
    )
    console.log("POST", post)
    
    if(post.rows.length === 0) {
      return res.status(403).json({ error: 'Je ne trouve pas ce post' })
    }

    const result = await pool.query(
     `UPDATE posts SET title = $1, content = $2, image = $3
      WHERE id = $4
      RETURNING *`,
      [title, content, image, id]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Erreur dans /posts/:id :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});
  
router.delete('/posts/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id

  console.log('ID du post demandé :', id);
  console.log('ID de l\'utilisateur connecté :', userId);
  
  try {
    const post = await pool.query(
      'SELECT * FROM posts WHERE id = $1 AND user_id = $2',
      [id, userId]
    )

    if(post.rows.length === 0) {
      return res.status(403).json({ error: 'Vous n\'avez pas le droit de supprimer ce post' })
    }

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
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Aucun fichier reçu' });
  }

  res.status(200).json({ file: req.file });
});

//ROUTE REGISTER
router.post('/register', async (req, res) => {
  console.log('Requête reçue à /register avec :', req.body);
  const { username, email, password, roles } = req.body;
  
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userInsert = await pool.query(`
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING id
      `, [username, email, hashedPassword])

      const userId = userInsert.rows[0].id

      for (const roleName of roles) {
        const roleResult = await pool.query(
          `SELECT id FROM roles WHERE name = $1`,
          [roleName]
        )

        const roleId = roleResult.rows[0].id

        await pool.query(`
          INSERT INTO user_roles (user_id, role_id)
          VALUES ($1, $2)`,
          [userId, roleId])
      }

      res.status(201).json({ message: 'Utilisateur créé avec succès !' });
    } catch (error) {
    console.error('Erreur dans lors de l\'inscription :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

//ROUTE LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const userResult = await pool.query(`
      SELECT * FROM users WHERE email = $1`,
      [email]
      )

      if (userResult.rows.length === 0) {
        return res.status(401).json({ message: 'Utilisateur introuvable' })
      }
      
    const user = userResult.rows[0]

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json( { message: 'Mot de passe incnorect'})
    }

    const rolesResult = await pool.query(`
      SELECT r.name FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = $1
      `, [user.id])

      const roles = rolesResult.rows.map(r => r.name)

    const token = jwt.sign(
      { id: user.id,
        username: user.username,
        email: user.email,
        roles: roles },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.status(200).json({message: 'Utilisateur connecté avec succès !',
      token,
      user: {
        id: user.id,
        username: user.username,
        roles: roles
      }
    });
  
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


export default router;
