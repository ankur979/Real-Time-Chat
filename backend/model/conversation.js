const mongoose = require("mongoose");

const conversationModel = new mongoose.Schema({
    members: {
        type: Array,
    }
}, { timestamps: true })

module.exports = mongoose.model("conversation",conversationModel)