const express = require("express");
const taskController = require("../controllers/taskController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.use(authController.protect);

router.get("/get-all-tasks/", taskController.getTasks);
router.put("/edit-task/:id", taskController.updateTask);
router.post("/add-task", userController.getMe, taskController.createTask);
router.delete("/delete-task/:id", taskController.deleteTask);
router.put("/toggle-task/:id", taskController.toggleTask);

module.exports = router;
