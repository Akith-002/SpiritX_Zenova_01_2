const Player = require('../models/player.model');

// Get all players
const getAllPlayers = async (req, res) => {
    try {
        const players = await Player.find({});
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get player by ID
const getPlayerById = async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.status(200).json(player);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new player
const createPlayer = async (req, res) => {
    try {
        const newPlayer = new Player(req.body);
        const savedPlayer = await newPlayer.save();
        res.status(201).json(savedPlayer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update player
const updatePlayer = async (req, res) => {
    try {
        const updatedPlayer = await Player.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedPlayer) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.status(200).json(updatedPlayer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete player
const deletePlayer = async (req, res) => {
    try {
        const deletedPlayer = await Player.findByIdAndDelete(req.params.id);
        if (!deletedPlayer) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.status(200).json({ message: 'Player deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update player stats
const updatePlayerStats = async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }

        const { stats } = req.body;
        player.stats = {
            ...player.stats,
            ...stats
        };

        const updatedPlayer = await player.save();
        res.status(200).json(updatedPlayer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get players by university
const getPlayersByUniversity = async (req, res) => {
    try {
        const players = await Player.find({ university: req.params.university });
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllPlayers,
    getPlayerById,
    createPlayer,
    updatePlayer,
    deletePlayer,
    updatePlayerStats,
    getPlayersByUniversity
};