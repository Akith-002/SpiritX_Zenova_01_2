const express = require('express');
const router = express.Router();
const {
    getAllPlayers,
    getPlayerById,
    createPlayer,
    updatePlayer,
    deletePlayer,
    updatePlayerStats,
    getPlayersByUniversity
} = require('../controllers/players.controller');

// Basic CRUD routes
router.get('/', getAllPlayers);
router.get('/:id', getPlayerById);
router.post('/', createPlayer);
router.put('/:id', updatePlayer);
router.delete('/:id', deletePlayer);

// Additional routes
router.patch('/:id/stats', updatePlayerStats);
router.get('/university/:university', getPlayersByUniversity);

module.exports = router;