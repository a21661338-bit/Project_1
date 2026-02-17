const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// ===== MODELS =====
const Question = require('../models/Questions');
const Course = require('../models/Course');
const Subject = require('../models/Subject');
const Faculty = require('../models/faculty');
const Feedback = require('../models/Feedback');

// ================= QUESTIONS =================
router.get('/questions', async (req, res) => {
  res.json(await Question.find());
});

router.post('/questions', async (req, res) => {
  res.json(await new Question(req.body).save());
});

router.put('/questions/:id', async (req, res) => {
  res.json(
    await Question.findByIdAndUpdate(req.params.id, req.body, { new: true })
  );
});

router.delete('/questions/:id', async (req, res) => {
  await Question.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted ✅' });
});

// ================= COURSES =================
router.get('/courses', async (req, res) => {
  res.json(await Course.find());
});

router.post('/courses', async (req, res) => {
  res.json(await new Course(req.body).save());
});

router.delete('/courses/:id', async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted ✅' });
});

// ================= SUBJECTS =================
router.get('/subjects', async (req, res) => {
  const { courseId } = req.query;
  const filter = courseId ? { course: courseId } : {};
  res.json(await Subject.find(filter));
});

router.post('/subjects', async (req, res) => {
  res.json(await new Subject(req.body).save());
});

router.delete('/subjects/:id', async (req, res) => {
  await Subject.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted ✅' });
});

// ================= FACULTIES =================
// 🔥 FIXED ObjectId issue here
router.get('/faculties', async (req, res) => {
  try {
    const { subjectId } = req.query;

    const filter = subjectId
      ? { subjects: new mongoose.Types.ObjectId(subjectId) }
      : {};

    const faculties = await Faculty.find(filter);
    res.json(faculties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching faculties' });
  }
});

router.post('/faculties', async (req, res) => {
  res.json(await new Faculty(req.body).save());
});

router.delete('/faculties/:id', async (req, res) => {
  await Faculty.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted ✅' });
});

// ================= FEEDBACK =================
router.get('/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate('course', 'name')
      .populate('subject', 'name')
      .populate('faculty', 'name')
      .sort({ createdAt: -1 });

    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching feedback' });
  }
});

// ================= ANALYTICS =================
router.get('/analytics/faculty-average', async (req, res) => {
  try {
    const result = await Feedback.aggregate([
      { $addFields: { avgAnswer: { $avg: "$answers" } } },
      {
        $lookup: {
          from: "faculties",
          localField: "faculty",
          foreignField: "_id",
          as: "faculty"
        }
      },
      { $unwind: "$faculty" },
      {
        $lookup: {
          from: "subjects",
          localField: "subject",
          foreignField: "_id",
          as: "subject"
        }
      },
      { $unwind: { path: "$subject", preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: "$faculty._id",
          facultyName: { $first: "$faculty.name" },
          subjectName: { $first: "$subject.name" },
          averageRating: { $avg: "$avgAnswer" },
          totalFeedbacks: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          facultyName: 1,
          subjectName: 1,
          averageRating: { $round: ["$averageRating", 2] },
          totalFeedbacks: 1
        }
      }
    ]);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Faculty analytics failed" });
  }
});

module.exports = router;
