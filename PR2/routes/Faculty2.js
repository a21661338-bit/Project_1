const express = require('express');
const router = express.Router();
const Faculty = require('../models/faculty');

// GET faculties (filter by subjectId if provided)
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.subjectId) {
      filter.subject = req.query.subjectId; // only faculties of selected subject
    }
    const faculties = await Faculty.find(filter); // <-- fixed variable name (faculties)
    res.json(faculties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST faculty
router.post('/', async (req, res) => {
  try {
    const faculty = new Faculty(req.body);
    await faculty.save();
    res.status(201).json(faculty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE faculty by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedFaculty = await Faculty.findByIdAndDelete(req.params.id);

    if (!deletedFaculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.json({ message: "Faculty deleted successfully ✅" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
