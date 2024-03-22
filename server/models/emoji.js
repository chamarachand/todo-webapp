const mongoose = require("mongoose");

const emojiSchema = new mongoose.Schema({
  name: String,
  emoji: String,
  unicode: String,
});

const Emoji = mongoose.model("Emoji", emojiSchema);

module.exports = { Emoji };
