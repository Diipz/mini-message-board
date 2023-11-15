const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Post = require("../schema/post");
const { db } = require("../db");



/* create inital message array */
const messages = [];

console.log(db);

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

  saveMessage(message, userName);
});


//save into MongoDB
async function saveMessage(text, name) {
  const post = new Post({
    text: text,
    name: name,
    date: new Date()
   })
  await post.save()
}


module.exports = router;
