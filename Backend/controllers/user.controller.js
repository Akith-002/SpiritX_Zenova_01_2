const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    // Return user info and token
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Register new user
exports.addUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: "Email is already in use" });
      }
      if (existingUser.username === username) {
        return res.status(400).json({ message: "Username is already taken" });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username, email: newUser.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Other user controller functions
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }, { password: 0 });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { username } = req.params;
    const updates = req.body;

    // Don't allow updating username or email to existing values
    if (updates.email || updates.username) {
      const existingUser = await User.findOne({
        $or: [
          { email: updates.email, username: { $ne: username } },
          { username: updates.username, username: { $ne: username } },
        ],
      });

      if (existingUser) {
        if (existingUser.email === updates.email) {
          return res.status(400).json({ message: "Email is already in use" });
        }
        if (existingUser.username === updates.username) {
          return res.status(400).json({ message: "Username is already taken" });
        }
      }
    }

    // Hash password if it's being updated
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const updatedUser = await User.findOneAndUpdate({ username }, updates, {
      new: true,
      runValidators: true,
      fields: { password: 0 },
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { username } = req.params;
    const deletedUser = await User.findOneAndDelete({ username });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
