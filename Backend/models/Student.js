// backend/models/Student.js
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  rollNo: { type: String, required: true, trim: true, unique: true },
  department: { type: String, required: true, trim: true },
  cgpa: { type: Number, required: true, min: 0, max: 10 },
}, {
  timestamps: true
});

module.exports = mongoose.model("Student", studentSchema);
