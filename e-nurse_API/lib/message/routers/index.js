const express = require("express");
const router = express.Router();
const { createMessage, getAllMessages, viewedAt, markAllMessagesAsViewed } = require("../controllers");
const {isAuth} = require("../../middlewares");

router.post("/:id", isAuth, createMessage);
router.get("/:id", isAuth, getAllMessages);
router.post("/:id/viewed", isAuth, markAllMessagesAsViewed);


module.exports = router;
