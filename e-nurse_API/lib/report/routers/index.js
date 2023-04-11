const express = require("express");
const router = express.Router();
const controllers = require("../controllers");
const middleware = require("../../middlewares");

// Create a new report

router.post('/', middleware.isAuth, controllers.create);
// router.post('/', controllers.create);

// Get all reports
router.get('/', middleware.isAuth, controllers.getAll);

// Get a specific report by id
router.get('/:id', middleware.isAuth, controllers.get);

// Update a specific report by id
router.patch('/:id', middleware.isAuth, controllers.update);

// Delete a specific report by id
router.delete('/:id', middleware.isAuth, controllers.delete);

module.exports = router;
