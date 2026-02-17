const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    userId: String,
    name: String,
    role: String,
    email: String,
    type: String,
    time:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("Activity", activitySchema);
