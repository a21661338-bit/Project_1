const mongoose = require('mongoose');
const Student = require('./models/student.js');
const Admin = require('./models/admin.js');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/faculty_feedback')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

async function seedDB() {
    try {
        // Clear existing data (optional)
        await Student.deleteMany({});
        await Admin.deleteMany({});

        // Add one student
        const student = new Student({
            name: "John Doe",
            email: "student@example.com",
            password: "12345"
        });
        await student.save();

        // Add one admin
        const admin = new Admin({
            name: "Admin User",
            email: "admin@example.com",
            password: "admin123"
        });
        await admin.save();

        console.log('Database seeded successfully ✅');

        // Close connection
        mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
}

seedDB();
