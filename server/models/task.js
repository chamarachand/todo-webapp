const Joi = require("joi");
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  taskName: { type: String, minlength: 1, maxlength: 100, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const Task = mongoose.model("Task", taskSchema);

function validateTask(task) {
  const schema = Joi.object({
    user: Joi.objectId().required(), //
    taskName: Joi.string().min(1).max(100).required(),
    completed: Joi.boolean(),
  });

  return schema.validate(task);
}

function validatePatch(task) {
  const patchSchema = Joi.object({
    completed: Joi.boolean().required(),
  });

  return patchSchema.validate(task);
}

module.exports = { Task, validate: validateTask, validatePatch };
