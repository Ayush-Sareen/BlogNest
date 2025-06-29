import jwt from 'jsonwebtoken';

const SECRET = 'secret123';

const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    // Optionally set req.user = decoded if needed
    next();
  });
};

export default verifyAdmin;
