const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farm: { type: mongoose.Schema.Types.ObjectId, ref: 'Farm', required: true },
  name: { type: String, required: true },
  plantingDate: { type: Date },
  expectedHarvestDate: { type: Date },
  status: { type: String, enum: ['পরিকল্পিত', 'চলমান', 'কাটা হয়েছে'], default: 'পরিকল্পিত' },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Crop', cropSchema);
