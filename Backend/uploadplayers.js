require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const csvParser = require("csv-parser");
const Player = require("./models/player.model"); // Adjust the path if needed

const MONGO_URI = process.env.MONGODB_URI;

// Connect to MongoDB - removing deprecated options
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const filePath = path.join(__dirname, "sample_data.csv");

async function processCSV() {
  return new Promise((resolve, reject) => {
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
      .on("end", () => {
        resolve(players);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

async function uploadPlayers() {
  try {
    // Clear all existing player records
    console.log("Deleting existing player records...");
    await Player.deleteMany({});
    console.log("All existing player records deleted successfully");

    // Process CSV and get player data
    console.log("Reading CSV file...");
    const players = await processCSV();
    console.log(`Read ${players.length} players from CSV`);

    // Insert all players
    console.log("Inserting players into database...");
    await Player.insertMany(players);
    console.log(`Successfully uploaded ${players.length} players`);

    return "Process completed successfully";
  } catch (error) {
    console.error("Error in upload process:", error);
    throw error;
  }
}

// Main execution
uploadPlayers()
  .then((message) => {
    console.log(message);
  })
  .catch((err) => {
    console.error("Upload failed:", err);
  })
  .finally(() => {
    // Only close the connection after all operations are complete
    console.log("Closing MongoDB connection...");
    mongoose.connection
      .close()
      .then(() => console.log("MongoDB connection closed"))
      .catch((err) => console.error("Error closing MongoDB connection:", err));
  });
