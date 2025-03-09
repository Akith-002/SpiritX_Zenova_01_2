const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username is Already Existing"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    validate: {
      validator: function (v) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/.test(v);
      },
      message: (props) =>
        "Password must contain at least one lowercase letter, one uppercase letter, and one special character",
    },
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email is Already Existing"],
  },

  role: {
    type: String,
    enum: ["superadmin", "admin"],
    default: "admin",
  },

  permissions: {
    type: [String],
    default: ["read"],
  },
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
