const express = require("express");
const router = express.Router();

/* GET users listing */
router.get("/", (req, res) => {
    res.render("form", { title: "New message" });
});

module.exports = router;