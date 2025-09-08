const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// ✅ Create student
router.post("/", async (req, res) => {
  try {
    const { name, rollNo, department, cgpa } = req.body;

    if (!name || !rollNo || !department || cgpa === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Student.findOne({ rollNo });
    if (existing) {
      return res.status(400).json({ message: "Student with this Roll No already exists" });
    }

    const student = new Student({ name, rollNo, department, cgpa });
    await student.save();

    res.status(201).json({ message: "Student added successfully", student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get student by Roll No
router.get("/:rollNo", async (req, res) => {
  try {
    const student = await Student.findOne({ rollNo: req.params.rollNo });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update student (partial update allowed)
router.put("/:rollNo", async (req, res) => {
  try {
    const rollNo = req.params.rollNo;

    const updateData = {};
    if (req.body.name) updateData.name = req.body.name;
    if (req.body.department) updateData.department = req.body.department;
    if (req.body.cgpa !== undefined) updateData.cgpa = req.body.cgpa;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No fields provided to update" });
    }

    const updatedStudent = await Student.findOneAndUpdate(
      { rollNo },
      updateData,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student updated successfully", student: updatedStudent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete student
router.delete("/:rollNo", async (req, res) => {
  try {
    const deletedStudent = await Student.findOneAndDelete({ rollNo: req.params.rollNo });

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
