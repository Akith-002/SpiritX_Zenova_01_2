const { text } = require('express');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema ({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username is Already Existing"]
    },

    members: [{
        type: String,
        required: true
    }]

});

const team = mongoose.model("team", teamSchema);
module.exports = team;