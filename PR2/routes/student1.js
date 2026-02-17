const express = require("express");
const router = express.Router();

const Student = require("../models/student");
const Activity = require("../models/Activity");


// ================= STUDENT SIGNUP =================
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check existing user
    const existing = await Student.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists ❌" });
    }

    // create student
    const student = new Student({ name, email, password });
    await student.save();

    // create activity log
    await Activity.create({
      userId: student._id,
      name: student.name,
      email: student.email,
      role: "student",
      type: "signup"
    });

    res.status(201).json({
      message: "Student registered successfully ✅"
    });

  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Signup failed ❌" });
  }
});


// ================= STUDENT LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email, password });

    if (!student) {
      return res.status(401).json({
        message: "Invalid credentials ❌"
      });
    }

    // create activity log
    await Activity.create({
      userId: student._id,
      name: student.name,
      email: student.email,
      role: "student",
      type: "login"
    });

    res.json({
      message: "Login successful ✅",
      student
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Login error ❌" });
  }
});


// ================= EXPORT ROUTER =================
module.exports = router;
