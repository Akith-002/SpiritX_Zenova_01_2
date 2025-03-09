const { text } = require('express');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema (
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: [true, "Username is Already Existing"],
        },

        password: {
            type: String,
            required: [true, 'Password is required'],
            validate: {
                validator: function(v) {
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/.test(v);
                },
                message: props => 'Password must contain at least one lowercase letter, one uppercase letter, and one special character'
            }
        },

        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: [true, 'Email is Already Existing']
        },
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;