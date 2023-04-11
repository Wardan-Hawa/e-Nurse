var express = require('express');
var router = express.Router();

/* GET home page. */
router.use("/users", require("../lib/users/routers"));
router.use("/interactions", require("../lib/interaction/routers"));
router.use("/report", require("../lib/report/routers"));
router.use("/consulting", require("../lib/consulting/routers"));
router.use("/message", require("../lib/message/routers"));


module.exports = router;
