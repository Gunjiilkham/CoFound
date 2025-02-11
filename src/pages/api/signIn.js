import bcrypt from 'bcrypt';
import pool from '../../lib/db';

const signIn = async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      //check if user exists
      const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

      // If no user is found
      if (result.rows.length === 0) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const user = result.rows[0];

      // Check if the password matches)
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      //response codes
      return res.status(200).json({ message: 'User signed in successfully' });
    } catch (err) {
      console.error('Error signing in:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};

export default signIn;
