const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const Crop = require('../models/Crop');

router.get('/', auth, async (req, res) => {
  const crops = await Crop.find({ user: req.user.id }).populate('farm', 'name').sort('-createdAt');
  res.json(crops);
});

router.post('/', auth, async (req, res) => {
  try {
    const crop = await Crop.create({ ...req.body, user: req.user.id });
    res.status(201).json(crop);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  const crop = await Crop.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body, { new: true }
  );
  if (!crop) return res.status(404).json({ message: 'ফসল পাওয়া যায়নি' });
  res.json(crop);
});

router.delete('/:id', auth, async (req, res) => {
  await Crop.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ message: 'ফসল মুছে ফেলা হয়েছে' });
});

module.exports = router;
