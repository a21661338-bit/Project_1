const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');

// GET subjects (filter by courseId if provided)
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.courseId) {
      filter.course = req.query.courseId; // only subjects of selected course
    }
    const subjects = await Subject.find(filter);
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add subject
router.post('/', async (req, res) => {
  try {
    const subject = new Subject(req.body);
    await subject.save();
    res.json(subject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete subject
router.delete('/:id', async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id);
    res.json({ message: 'Subject deleted ✅' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
