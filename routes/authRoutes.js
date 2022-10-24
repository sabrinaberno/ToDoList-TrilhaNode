const routes = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const AuthController = require("../controller/authController");

routes.use(authMiddleware);

routes.get("/", AuthController.getAllUser);
routes.get("/createUser", AuthController.createUser);
routes.post("/register", AuthController.register);
routes.post("/authenticate", AuthController.authenticateUser);




module.exports = routes;