const router = require("express").Router();
const controller = require("../controllers/logout");

router.get("/", controller.handleLogout);

module.exports = router;
