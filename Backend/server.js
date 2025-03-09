// server.js
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const csv = require("csv-parser");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Load player data
let playerData = [];
fs.createReadStream("sample_data.csv")
  .pipe(csv())
  .on("data", (data) => playerData.push(data))
  .on("end", () => {
    console.log("Player data loaded successfully");
  });

// Calculate player stats
function calculatePlayerStats(player) {
  // Batting stats
  const battingStrikeRate =
    (parseInt(player["Total Runs"]) / parseInt(player["Balls Faced"])) * 100;
  const battingAverage =
    parseInt(player["Total Runs"]) / parseInt(player["Innings Played"]);

  // Bowling stats - handle division by zero cases
  let bowlingStrikeRate = 0;
  let economyRate = 0;

  if (parseInt(player["Wickets"]) > 0) {
    // Convert overs to balls (1 over = 6 balls)
    const totalBallsBowled = parseInt(player["Overs Bowled"]) * 6;
    bowlingStrikeRate = totalBallsBowled / parseInt(player["Wickets"]);
    economyRate = (parseInt(player["Runs Conceded"]) / totalBallsBowled) * 6;
  }

  return {
    battingStrikeRate,
    battingAverage,
    bowlingStrikeRate,
    economyRate,
  };
}

// API endpoint for chatbot
app.post("/api/spiriter", async (req, res) => {
  try {
    const { message } = req.body;

    // Check if user is asking for the best possible team
    if (
      message.toLowerCase().includes("best team") ||
      message.toLowerCase().includes("best possible team")
    ) {
      // Calculate points for each player (without revealing them to the user)
      const playersWithPoints = playerData.map((player) => {
        const stats = calculatePlayerStats(player);
        const points =
          stats.battingStrikeRate / 5 +
          stats.battingAverage * 0.8 +
          (500 / (stats.bowlingStrikeRate || 1) +
            140 / (stats.economyRate || 1));

        return {
          ...player,
          points,
        };
      });

      // Sort players by points and get top 11
      const bestTeam = playersWithPoints
        .sort((a, b) => b.points - a.points)
        .slice(0, 11);

      // Format the response (without showing points)
      const response = `Here's my recommendation for the best possible team of 11 players:\n\n${bestTeam
        .map(
          (player, index) =>
            `${index + 1}. ${player.Name} (${player.University}) - ${
              player.Category
            }`
        )
        .join("\n")}`;

      res.json({ response });
    }
    // Handling player statistics queries
    else if (
      message.toLowerCase().includes("stats") ||
      message.toLowerCase().includes("statistics")
    ) {
      // Extract player name from the query
      const playerNames = playerData.map((p) => p.Name.toLowerCase());
      const foundPlayer = playerData.find((p) =>
        message.toLowerCase().includes(p.Name.toLowerCase())
      );

      if (foundPlayer) {
        const stats = calculatePlayerStats(foundPlayer);

        const response = `
Here are ${foundPlayer.Name}'s statistics:
University: ${foundPlayer.University}
Category: ${foundPlayer.Category}
Total Runs: ${foundPlayer["Total Runs"]}
Balls Faced: ${foundPlayer["Balls Faced"]}
Innings Played: ${foundPlayer["Innings Played"]}
Batting Strike Rate: ${stats.battingStrikeRate.toFixed(2)}
Batting Average: ${stats.battingAverage.toFixed(2)}
${
  foundPlayer.Category !== "Batsman"
    ? `Wickets: ${foundPlayer.Wickets}
Overs Bowled: ${foundPlayer["Overs Bowled"]}
Runs Conceded: ${foundPlayer["Runs Conceded"]}
Bowling Strike Rate: ${
        stats.bowlingStrikeRate ? stats.bowlingStrikeRate.toFixed(2) : "N/A"
      }
Economy Rate: ${stats.economyRate ? stats.economyRate.toFixed(2) : "N/A"}`
    : ""
}
`;
        res.json({ response });
      } else {
        // Use Gemini API for general queries about players
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        // Create context for the model
        const context = `
You are Spiriter, an AI assistant for a fantasy cricket game called Spirit11. You help users with information about university cricket players and their statistics. 
You have data about ${playerData.length} players. 
You must never reveal or calculate player points. If asked about points, respond that you cannot reveal that information.
If asked about information not in the player database, respond: "I don't have enough knowledge to answer that question."
`;

        const prompt = context + "\n\nUser query: " + message;
        const result = await model.generateContent(prompt);
        const response = result.response.text();

        res.json({ response });
      }
    } else {
      // Use Gemini for general queries
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      // Create context for the model with player data
      const context = `
You are Spiriter, an AI assistant for a fantasy cricket game called Spirit11. You help users with information about university cricket players and their statistics. 
You have data about these players: ${playerData.map((p) => p.Name).join(", ")}.
You must never reveal or calculate player points. If asked about points, respond that you cannot reveal that information.
If asked about information not in the player database, respond: "I don't have enough knowledge to answer that question."
`;

      const prompt = context + "\n\nUser query: " + message;
      const result = await model.generateContent(prompt);
      const response = result.response.text();

      res.json({ response });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
