const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, phone, password, address } = req.body;
    if (!name || !phone || !password)
      return res.status(400).json({ message: 'নাম, ফোন ও পাসওয়ার্ড দিন' });

    const exists = await User.findOne({ phone });
    if (exists) return res.status(400).json({ message: 'এই ফোন নম্বর দিয়ে আগেই নিবন্ধন হয়েছে' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, phone, password: hashed, address });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, name: user.name, phone: user.phone } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ message: 'ফোন নম্বর বা পাসওয়ার্ড ভুল' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'ফোন নম্বর বা পাসওয়ার্ড ভুল' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, phone: user.phone } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
