// seedQuestions.js
const mongoose = require('mongoose');
const Question = require('./models/Questions'); 
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/faculty_feedback')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

async function seedQuestions() {
    try {
        // Clear existing questions
        await Question.deleteMany({});

        // Add initial questions
        const questions = [
            { text: "Rate the teaching quality" },
            { text: "Was the subject clear?" },
            { text: "Would you recommend this faculty?" },
            { text: "Was the course material helpful?" },
            { text: "How interactive was the class?" }
        ];

        await Question.insertMany(questions);
        console.log("Questions seeded successfully ✅");

        // Close connection
        mongoose.connection.close();
    } catch (err) {
        console.error("Error seeding questions:", err);
    }
}

// Run the seeding function
seedQuestions();
