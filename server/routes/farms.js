const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const Farm = require('../models/Farm');

// GET all farms
router.get('/', auth, async (req, res) => {
  const farms = await Farm.find({ user: req.user.id }).sort('-createdAt');
  res.json(farms);
});

// POST create farm
router.post('/', auth, async (req, res) => {
  try {
    const farm = await Farm.create({ ...req.body, user: req.user.id });
    res.status(201).json(farm);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update farm
router.put('/:id', auth, async (req, res) => {
  const farm = await Farm.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body, { new: true }
  );
  if (!farm) return res.status(404).json({ message: 'জমি পাওয়া যায়নি' });
  res.json(farm);
});

// DELETE farm
router.delete('/:id', auth, async (req, res) => {
  await Farm.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ message: 'জমি মুছে ফেলা হয়েছে' });
});

module.exports = router;
