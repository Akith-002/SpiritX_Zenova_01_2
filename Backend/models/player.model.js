const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    university: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true
    },
    stats: {
        totalRuns: {
            type: Number,
            default: 0
        },
        ballsFaced: {
            type: Number,
            default: 0
        },
        inningsPlayed: {
            type: Number,
            default: 0
        },
        wickets: {
            type: Number,
            default: 0
        },
        oversBowled: {
            type: Number,
            default: 0
        },
        runsConceded: {
            type: Number,
            default: 0
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;