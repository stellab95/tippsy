// test-connexion.js
import pkg from 'pg';
import 'dotenv/config';

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const test = async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Connexion réussie ! Résultat :', result.rows[0]);
    process.exit();
  } catch (error) {
    console.error('❌ Erreur de connexion :', error);
    process.exit(1);
  }
};

test();
