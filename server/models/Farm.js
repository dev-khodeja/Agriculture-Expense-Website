const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  location: { type: String },
  size: { type: Number }, // in bigha
  sizeUnit: { type: String, default: 'বিঘা' },
  soilType: { type: String, enum: ['এঁটেল', 'বেলে', 'দোআঁশ', 'পলি'], default: 'দোআঁশ' },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Farm', farmSchema);
