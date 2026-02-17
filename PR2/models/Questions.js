const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    type: { type: String, default: "rating" } // type can be rating, text, etc
});

module.exports = mongoose.model('Question', questionSchema);
