const express = require("express");
const router = express.Router();
const controllers = require("../controllers");
const middleware = require("../../middlewares");

// Create a new interaction
router.post('/', middleware.isAuth, controllers.createInteraction);

// Get all interactions
router.get('/', middleware.isAuth, controllers.getInteractions);

// Get a specific interaction by id
router.get('/:id', middleware.isAuth, controllers.getInteractions);

// Update a specific interaction by id
router.patch('/:id', middleware.isAuth, controllers.updateInteraction);

// Delete a specific interaction by id
router.delete('/:id', middleware.isAuth, controllers.deleteInteraction);

module.exports = router;
