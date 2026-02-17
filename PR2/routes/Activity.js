const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");
const Student = require("../models/student");

// GET LOGIN or SIGNUP LOGS
router.get("/:type", async (req, res) => {
  try {
    const type = req.params.type;

    const data = await Activity.find({ type }).sort({ time: -1 });

    // restore email for old logs if missing
    const result = await Promise.all(
      data.map(async item => {
        if (!item.email && item.userId) {
          const student = await Student.findById(item.userId);
          return {
            ...item._doc,
            email: student ? student.email : "Not found",
          };
        }
        return item;
      })
    );

    res.json(result);
  } catch (err) {
    console.error("Activity fetch error:", err);
    res.status(500).json({ message: "Error fetching activity logs" });
  }
});

module.exports = router;
