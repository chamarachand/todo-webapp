const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password");

    const token = user.generateAuthToken();
    res.send({ token, message: "Logged in Successfully" });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().email().min(5).max(255).label("Email").required(),
    password: Joi.string().min(3).max(1024).label("Password").required(),
  });

  return schema.validate(user);
}

module.exports = router;
