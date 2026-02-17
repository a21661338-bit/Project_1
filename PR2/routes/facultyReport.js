const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Faculty = require('../models/faculty');
const Feedback = require('../models/Feedback');
const Subject = require('../models/Subject');
const Course = require('../models/Course');

router.get('/', async (req, res) => {
  try {
    const { facultyId } = req.query;

    // Lookup all faculties or single one if facultyId provided
    const filter = facultyId ? { _id: facultyId } : {};

    const faculties = await Faculty.find(filter)
      .populate({
        path: 'subject',
        populate: { path: 'course' }
      });

    // Calculate avgRating and totalFeedback for each faculty
    const result = await Promise.all(
      faculties.map(async f => {
        const feedbacks = await Feedback.find({ faculty: f._id });
        const avgRating = feedbacks.length
          ? feedbacks.reduce((sum, fb) => sum + fb.answers.reduce((a, b) => a + b, 0) / fb.answers.length, 0) / feedbacks.length
          : 0;
        const totalFeedback = feedbacks.length;

        return {
          _id: f._id,
          name: f.name,
          subject: f.subject ? f.subject.name : "Unknown",
          course: f.subject && f.subject.course ? f.subject.course.name : "Unknown",
          createdAt: f.createdAt,
          avgRating: parseFloat(avgRating.toFixed(1)),
          totalFeedback
        };
      })
    );

    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error generating faculty report' });
  }
});

module.exports = router;
