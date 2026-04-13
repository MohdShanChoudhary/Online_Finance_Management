const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const adminUser = {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'password123'
  };

  if (username !== adminUser.username || password !== adminUser.password) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const token = jwt.sign(
    { username: adminUser.username },
    process.env.JWT_SECRET || 'change_this_secret',
    { expiresIn: '4h' }
  );

  res.json({ token });
});

module.exports = router;
