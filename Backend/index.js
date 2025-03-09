require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user.routes.js");
const teamRoutes = require("./routes/team.routes.js");
const playerRoutes = require("./routes/player.routes.js");
const spiriterRoutes = require("./routes/spiriter.routes.js");
const adminRoutes = require("./routes/admin.routes.js"); // Add this new route

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes configuration
app.use("/api/users", userRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/spiriter", spiriterRoutes);
app.use("/api/admins", adminRoutes); // Add the admin route

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to Database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Unable to connect : ", err);
  });
