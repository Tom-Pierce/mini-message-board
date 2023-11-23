const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Message = require("../models/message");
require("dotenv").config();
mongoose
  .connect(process.env.MESSAGES_DB)
  .then((x) =>
    console.log(`Connected the Database: "${x.connections[0].name}"`),
  )
  .catch((err) => console.log("Error connecting to mongo", err));

router.get("/", async function (req, res, next) {
  await Message.find().then((messages) => {
    res.render("index", { title: "Mini Message Board", messages: messages });
  });
});

router.post("/new", async function (req, res, next) {
  const message = new Message({
    text: req.body.message,
    user: req.body.user,
    added: new Date(),
  });
  await message.save();
  res.redirect("/");
});

module.exports = router;
