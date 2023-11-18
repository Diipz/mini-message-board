const express = require('express');
const router = express.Router();
const messageModel = require("../models/message");

/* create inital message array */
const messages = [];

const message = new messageModel({
  text: "Hi",
  user: "Chan",
  added: new Date()
});

messages.unshift(message);

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

/* GET message from form then add to "messages" array then redirect to index page */
router.post("/new", (req, res) => {
  const userName = req.body.messageUser;
  const message = req.body.messageText;
  messages.unshift({ text: message, user: userName, added: new Date() });
  res.redirect("/");
});


module.exports = router;
