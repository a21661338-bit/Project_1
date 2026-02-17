const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB (Local)
mongoose.connect("mongodb://localhost:27017/faculty_feedback")
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.error(err));

// ------------------ ROUTES ------------------
app.use("/api/student", require("./routes/student1"));
app.use("/api/courses", require("./routes/Course2"));
app.use("/api/subjects", require("./routes/Subject2"));
app.use("/api/faculty", require("./routes/Faculty2"));
app.use("/api/questions", require("./routes/questions"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/feedback", require("./routes/feedback"));
app.use("/api/activity", require("./routes/Activity"));
app.use("/api/facultyReport", require("./routes/facultyReport"));

// Test route
app.get("/", (req, res) => res.send("Backend running 🚀"));

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
