const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farm: { type: mongoose.Schema.Types.ObjectId, ref: 'Farm' },
  crop: { type: mongoose.Schema.Types.ObjectId, ref: 'Crop' },
  category: { type: String, enum: ['বীজ', 'সার', 'শ্রমিক', 'সেচ', 'কীটনাশক', 'অন্যান্য'], required: true },
  amount: { type: Number, required: true },
  note: { type: String },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
