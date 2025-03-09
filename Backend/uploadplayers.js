require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const csvParser = require("csv-parser");
const Player = require("./models/player.model"); // Adjust the path if needed

const MONGO_URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const filePath = path.join(__dirname, "sample_data.csv");

const players = [];

fs.createReadStream(filePath)
  .pipe(csvParser())
  .on("data", (row) => {
    const player = new Player({
      name: row["Name"],
      university: row["University"],
      category: row["Category"],
      stats: {
        totalRuns: parseInt(row["Total Runs"]) || 0,
        ballsFaced: parseInt(row["Balls Faced"]) || 0,
        inningsPlayed: parseInt(row["Innings Played"]) || 0,
        wickets: parseInt(row["Wickets"]) || 0,
        oversBowled: parseInt(row["Overs Bowled"]) || 0,
        runsConceded: parseInt(row["Runs Conceded"]) || 0,
      },
    });

    players.push(player);
  })
  .on("end", async () => {
    try {
      await Player.insertMany(players);
      console.log("Players uploaded successfully");
      mongoose.connection.close();
    } catch (error) {
      console.error("Error inserting players:", error);
    }
  });
