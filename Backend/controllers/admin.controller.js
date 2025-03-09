const Admin = require("../models/admin.model.js");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({}, "-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addAdmin = async (req, res) => {
  try {
    const { username, password, email, role, permissions } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await Admin.create({
      username,
      password: hashedPassword,
      email,
      role: role || "admin",
      permissions: permissions || ["read"],
    });

    // Remove password from response
    const adminResponse = admin.toObject();
    delete adminResponse.password;

    res.status(201).json(adminResponse);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      res.status(400).json({ message: messages.join(", ") });
    } else if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      res.status(400).json({ message: `${field} already exists` });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const getAdmin = async (req, res) => {
  try {
    const { username } = req.params;
    const admin = await Admin.findOne({ username }, "-password");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { username } = req.params;
    const updates = { ...req.body };

    // Hash password if it's being updated
    if (updates.password) {
      const salt = await bcrypt.genSalt();
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    const admin = await Admin.findOneAndUpdate({ username }, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json(admin);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: messages.join(", ") });
    } else if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ message: `${field} already exists` });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { username } = req.params;
    const admin = await Admin.findOneAndDelete({ username });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Admin not found",
      });
    }

    if (await bcrypt.compare(password, admin.password)) {
      const adminPayload = {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        permissions: admin.permissions,
      };

      const accessToken = jwt.sign(
        adminPayload,
        process.env.ACCESS_TOKEN_SECRET
      );
      return res.json({
        success: true,
        accessToken,
        user: username,
        role: admin.role,
        permissions: admin.permissions,
      });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAdmins,
  addAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  adminLogin,
};
