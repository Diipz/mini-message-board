const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    text: String,
    name: String,
    date: String
})

module.exports = mongoose.model("Post", messageSchema)

