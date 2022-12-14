const routes = require("express").Router();
const TaskController = require("../controller/TaskController");

//routes.use(authMiddleware);

routes.get("/task", TaskController.getAllTasks);
routes.post("/create", TaskController.createTask);
routes.get("/getById/:id/:method", TaskController.getById);
routes.post("/updateOne/:id", TaskController.updateOneTask);
routes.get("/deleteOne/:id", TaskController.deleteOneTask);
routes.get("/check/:id", TaskController.taskCheck);

module.exports = routes;
