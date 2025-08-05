// const AppError = require("../utils/appError");
const Task = require("../models/taskModel");
const catchAsync = require("../utils/catchAsync");
// const catchAsync = require("./../utils/catchAsync");
const factory = require("./handleFactory");

exports.getTasks = factory.getAll(Task);
exports.updateTask = factory.updateOne(Task);
exports.deleteTask = factory.deleteOne(Task);
exports.createTask = factory.createOne(Task);

// toggle completion of task
exports.toggleTask = catchAsync(async (req, res, next) => {
  const taskId = req.params?.id;
  const userId = req?.user._id;
  const { isCompleted } = req.body;

  if (!taskId && !userId) {
    return res.status(401).json({
      status: "fail",
      message:
        "The task could not be completed because the task is missing or you don't have authorization",
    });
  }

  // Validate taskId format (if using MongoDB ObjectId)
  if (!taskId || !taskId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      error: true,
      message: "Invalid task ID format",
    });
  }

  try {
    // Find the task by ID and ensure it belongs to the authenticated user
    const task = await Task.findOne({
      _id: taskId,
      userId: userId,
    });
    console.log(taskId, userId, task);

    if (!task) {
      return res.status(404).json({
        error: true,
        message: "Task not found or you don't have permission to access it",
      });
    }

    // Toggle completion status or set to specific value
    // the isCompleted is coming from the client which he wants to set the value too.
    const newCompletionStatus =
      isCompleted !== undefined ? isCompleted : !task.isCompleted;
    // const newCompletionStatus = !task.isCompleted;

    // Update the task
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        isCompleted: newCompletionStatus,
        completedAt: newCompletionStatus ? new Date() : null,
      },
      {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators
      }
    );

    if (!updatedTask) {
      return res.status(500).json({
        error: true,
        message: "Failed to update task",
      });
    }

    // Return success response
    return res.status(200).json({
      error: false,
      message: `Task ${
        newCompletionStatus ? "completed" : "marked as incomplete"
      } successfully`,
      data: {
        task: updatedTask,
      },
    });
  } catch (error) {
    console.error("Error in completeTask controller:", error);

    // Handle specific MongoDB errors
    if (error.name === "CastError") {
      return res.status(400).json({
        error: true,
        message: "Invalid task ID",
      });
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        error: true,
        message: "Validation failed",
        details: Object.values(error.errors).map((err) => err.message),
      });
    }

    // Generic server error
    return res.status(500).json({
      error: true,
      message: "Internal server error. Please try again later.",
    });
  }
});
