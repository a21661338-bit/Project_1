const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5050;

// ------------------ MIDDLEWARE ------------------
app.use(cors());
app.use(express.json());

// Serve frontend from public folder
app.use(express.static(path.join(__dirname, "public")));

// Load one.html as homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "one.html"));
});

// ------------------ MONGODB ATLAS CONNECTION ------------------
mongoose.connect(
  "mongodb+srv://syedshahhyderquadri_db_user:duCDVPxeEyk7jYeM@cluster0.23ylwky.mongodb.net/?retryWrites=true&w=majority"
)
.then(() => console.log("MongoDB Atlas connected ✅"))
.catch((err) => console.error(err));

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

// ------------------ START SERVER ------------------
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
