const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const Task = require('../models/Task');

router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id }).populate('farm', 'name').sort('dueDate');
  res.json(tasks);
});

router.post('/', auth, async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, user: req.user.id });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Mark task complete/incomplete
router.patch('/:id/toggle', auth, async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
  if (!task) return res.status(404).json({ message: 'কাজ পাওয়া যায়নি' });
  task.completed = !task.completed;
  await task.save();
  res.json(task);
});

router.delete('/:id', auth, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ message: 'কাজ মুছে ফেলা হয়েছে' });
});

module.exports = router;
