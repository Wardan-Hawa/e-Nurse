const express = require("express");
const router = express.Router();
const { create, findAll, findById, remove, findAllForUser } = require("../controllers");
const middleware = require("../../middlewares");

router.post("/", middleware.isAuth, create);
router.get("/", middleware.isAuth ,findAll);
router.get("/user", middleware.isAuth ,findAllForUser);
router.get("/:id", middleware.isAuth, findById);
router.delete("/:id", middleware.isAuth, remove);

module.exports = router;
