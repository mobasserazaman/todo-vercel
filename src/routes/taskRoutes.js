const express = require('express');
const taskRouter = express.Router();
const { createTask, deleteTask, updateTask, getTasks} = require("../controllers/taskController");

taskRouter.route("/").get(getTasks).post(createTask);
taskRouter.route("/:id").put(updateTask).delete(deleteTask);

module.exports = taskRouter;