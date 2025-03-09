const express = require('express');
const router = express.Router();
const userController = require('../controllers/team.controller.js');   
const { authenticateToken } = require('../middleware/auth.middleware.js');

router.get('/', authenticateToken, userController.getTeams);
router.get('/:name', authenticateToken, userController.getTeam);
router.post('/', authenticateToken, userController.addTeam);
router.put('/:name', authenticateToken, userController.updateTeam);

module.exports = router;
