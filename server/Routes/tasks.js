const { Task, validate, validatePatch } = require("../models/task");
const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const user = require("../models/user");
const router = express.Router();

router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

router.get("/me", authMiddleware, async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.send(tasks);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const task = new Task(req.body);
  await task.save();
  res.send(task);
});

router.patch("/:id", async (req, res) => {
  let task = await Task.findById(req.params.id);

  if (!task) return res.status(404).send("Task with the given id not found");

  task.completed = !task.completed;
  task.updatedAt = Date.now();
  task = await task.save();

  res.send(task);
});

router.delete("/:id", async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id, { new: true });

  if (!task) return res.status(400).send("Task with the given Id not found");

  res.send(task);
});

router.delete("/", async (req, res) => {
  const result = await Task.deleteMany({});

  if (result.n === 0)
    return res.status(404).send("No documents found to delete");

  res.send(`${result.deletedCount} documents deleted successfully`);
});

module.exports = router;
