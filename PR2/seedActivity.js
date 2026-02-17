const mongoose = require("mongoose");
const Student = require("./models/student");
const Activity = require("./models/Activity");

mongoose.connect("mongodb://127.0.0.1:27017/faculty_feedback");


async function seed() {

    const students = await Student.find();

    for (let s of students) {

        await Activity.create({
            userId: s._id,
            name: s.name,
            role: "student",
            type: "signup",
            time: s._id.getTimestamp()
        });

        await Activity.create({
            userId: s._id,
            name: s.name,
            role: "student",
            type: "login",
            time: s._id.getTimestamp()
        });
    }

    console.log("Old activity generated ✅");
    process.exit();
}

seed();
