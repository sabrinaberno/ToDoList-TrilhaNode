const routes = require("express").Router();
const taskRoutes = require("./taksRoutes");
const authRoutes = require("./authRoutes");

routes.use('/', authRoutes);
routes.use(taskRoutes);

/*routes.get("/project", (req, res) => {
    res.send({ ok: true, user: req.userId });
}); */

module.exports = routes