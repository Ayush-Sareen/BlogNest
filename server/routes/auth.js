import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';
const SECRET = 'secret123';

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, SECRET);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

export default router;