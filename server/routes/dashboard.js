const router = require('express').Router();
const mongoose = require('mongoose');
const auth = require('../middleware/authMiddleware');
const Farm = require('../models/Farm');
const Crop = require('../models/Crop');
const Task = require('../models/Task');
const Expense = require('../models/Expense');

// GET /api/dashboard/summary
router.get('/summary', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const [totalFarms, activeCrops, todayTasks, expenses] = await Promise.all([
      Farm.countDocuments({ user: userId }),
      Crop.countDocuments({ user: userId, status: 'চলমান' }),
      Task.find({ user: userId, dueDate: { $gte: today, $lt: tomorrow }, completed: false })
        .populate('farm', 'name').limit(5),
      Expense.aggregate([
        { $match: { user: userObjectId } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ])
    ]);

    const totalExpense = expenses[0]?.total || 0;

    res.json({ totalFarms: totalFarms || 0, activeCrops: activeCrops || 0, todayTaskCount: todayTasks?.length || 0, todayTasks: todayTasks || [], totalExpense: totalExpense || 0 });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
