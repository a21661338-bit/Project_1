const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

router.post("/", async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();

    console.log("Feedback saved to DB ✅");

    res.json({ message: "Feedback submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving feedback" });
  }
});

module.exports = router;
    