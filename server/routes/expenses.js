const router = require('express').Router();
const mongoose = require('mongoose');
const auth = require('../middleware/authMiddleware');
const Expense = require('../models/Expense');

router.get('/', auth, async (req, res) => {
  const expenses = await Expense.find({ user: req.user.id })
    .populate('farm', 'name').populate('crop', 'name').sort('-date');
  res.json(expenses);
});

router.post('/', auth, async (req, res) => {
  try {
    const expense = await Expense.create({ ...req.body, user: req.user.id });
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  await Expense.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ message: 'খরচ মুছে ফেলা হয়েছে' });
});

router.get('/summary', auth, async (req, res) => {
  const userObjectId = new mongoose.Types.ObjectId(req.user.id);
  const summary = await Expense.aggregate([
    { $match: { user: userObjectId } },
    { $group: { _id: '$category', total: { $sum: '$amount' } } }
  ]);
  res.json(summary);
});

module.exports = router;
