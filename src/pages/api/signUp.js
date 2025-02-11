import bcrypt from 'bcrypt';
import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // checks if desired username already exists
    const checkUserQuery = 'SELECT * FROM users WHERE username = $1';
    const existingUser = await pool.query(checkUserQuery, [username]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const insertUserQuery = 'INSERT INTO users (username, password) VALUES ($1, $2)';
    await pool.query(insertUserQuery, [username, hashedPassword]);

    return res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error('Error during sign-up:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
