const express = require('express');
const router = express.Router();

/* create inital message array */
const messages = [
  {
    text: "I like you",
    user: "Chan",
    added: new Date()
  },
  {
    text: "Hi, cun I av ure cv? ",
    user: "Gav",
    added: new Date()
  },
  {
    text: "Hi",
    user: "Chan",
    added: new Date()
  }
];


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
