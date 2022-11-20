const controller = require("../controllers/responsibility");
const router = require("express").Router();

router
  .get("/", controller.getAll)
  .post("/", controller.createOne)
  .put("/:id", controller.updateOne)
  .delete("/:id", controller.deleteOne);

module.exports = router;
