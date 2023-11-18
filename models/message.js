const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    text: String,
    user: String,
    added: String
});

module.exports = mongoose.model("messageModel", messageSchema);

