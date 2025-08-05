const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  isPinned: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
  completedAt: { type: Date, default: null },
  userId: { type: String, required: true },
  createdOn: { type: Date, default: new Date().getTime() },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
