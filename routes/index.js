const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const messageModel = require("../models/message");



/* GET home page and copying documents from database */
router.get("/", async (req, res) => {
  try {
    //find all documents from messageModel and sort in reverse order
    const result = await messageModel.find().sort({ "added": -1 });
    res.render("index", { title: "Mini Messageboard", messages: result });
  } 
  catch(err) {
    res.status(500).send(err.message);
  }
});

/* GET message details from form, create document using details, save to Mongodb then redirect to index page */
router.post("/new", async (req, res) => {
  
  const message = new messageModel({
    text: req.body.messageText,
    user: req.body.messageUser,
    added: new Date()
  });

  try {
    await message.save();
    res.status(201).send({ message })
    res.redirect("/");
  } 
  catch(err) {
    res.status(400).send(err.message)
  }
});


module.exports = router;
