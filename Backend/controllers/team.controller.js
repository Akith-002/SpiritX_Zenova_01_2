const Team = require('../models/team.model.js');
require('dotenv').config();


const getTeams = async (req, res) => {
    try {
        const teams = await Team.find({});
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTeam = async (req, res) => {
    try {
        const { name } = req.params;
        const team = await Team.findOne({ username: name });

        if (!team) {
            res.status(404).json({ message: "Team not found" });
        }

        return res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addTeam = async (req, res) => {
    try {
        const { username, members } = req.body;
        const team = await team.create({
            username,
            members
        });

        res.status(201).json(team);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            res.status(400).json({ message: messages.join(', ') });
        } else if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            res.status(400).json({ message: `${field} already exists` });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

const updateTeam = async(res, req) => {
    try {
        const { name } = req.params;
        const updates = { ...req.body };

        const updatedTeam = await Team.findOneAndUpdate(
            { username: name }, 
            { members },
            { new: true, runValidators: true }
        );

        if ( !updateTeam ) {
            return res.status(404).json({ message: "Team not found" });
        }

        res.status(200).json(updatedTeam);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

const deleteTeam = async (req, res) => {
    try {
        const { name } = req.params;
        const deletedTeam = await Team.findOneAndDelete({ username: name });

        if (!deletedTeam) {
            return res.status(404).json({ message: "Team not found" });
        }

        res.status(200).json({ message: "Team deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTeams,
    getTeam,
    addTeam,
    updateTeam,
    deleteTeam
};