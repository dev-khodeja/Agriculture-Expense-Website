const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farm: { type: mongoose.Schema.Types.ObjectId, ref: 'Farm' },
  title: { type: String, required: true },
  type: { type: String, enum: ['সার', 'সেচ', 'ফসল কাটা', 'পরিদর্শন', 'অন্যান্য'], default: 'অন্যান্য' },
  dueDate: { type: Date, required: true },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
