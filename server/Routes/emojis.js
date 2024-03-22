const { Emoji } = require("../models/emoji");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const emojis = await Emoji.find();
  res.send(emojis);
});

router.get("/:keyWord", async (req, res) => {
  const regex = new RegExp(req.params.keyWord, "i");

  //   const emojis = await Emoji.find({ name: regex });
  const emojis = await Emoji.aggregate([
    {
      $match: { name: regex },
    },
    {
      $project: {
        name: 1,
        emoji: 1,
        unicode: 1,
        nameLength: { $strLenCP: "$name" },
      },
    },
    {
      $sort: { nameLength: 1 },
    },
  ]);
  res.send(emojis);
});

module.exports = router;
