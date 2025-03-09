// server.js
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const csv = require("csv-parser");
const fs = require("fs");
const { log } = require("console");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

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

// Store conversation history by session ID
const conversations = new Map();

// Calculate player stats
function calculatePlayerStats(player) {
  const totalRuns = parseInt(player["Total Runs"]) || 0; //handle potential null/undefined
  const ballsFaced = parseInt(player["Balls Faced"]) || 1; //avoid division by zero
  const inningsPlayed = parseInt(player["Innings Played"]) || 1; //avoid division by zero

  const battingStrikeRate = (totalRuns / ballsFaced) * 100;
  const battingAverage = totalRuns / inningsPlayed;

  const wickets = parseInt(player["Wickets"]) || 0;
  const oversBowled = parseInt(player["Overs Bowled"]) || 0;
  const runsConceded = parseInt(player["Runs Conceded"]) || 0;

  let bowlingStrikeRate = 0;
  let economyRate = 0;

  if (wickets > 0) {
    const totalBallsBowled = oversBowled * 6;
    bowlingStrikeRate = totalBallsBowled / wickets;
    economyRate = (runsConceded / totalBallsBowled) * 6;
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
    const { message, sessionId } = req.body;

    // Create a new conversation if this session doesn't exist
    if (!conversations.has(sessionId)) {
      conversations.set(sessionId, {
        history: [],
        lastContext: null,
      });
    }

    // Get the conversation for this session
    const conversation = conversations.get(sessionId);

    // Add user message to history
    conversation.history.push({ role: "user", content: message });

    let response = "";
    let contextToRemember = conversation.lastContext;

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
      response = `Here's my recommendation for the best possible team of 11 players:\n\n${bestTeam
        .map(
          (player, index) =>
            `${index + 1}. ${player.Name} (${player.University}) - ${
              player.Category
            }`
        )
        .join("\n")}`;

      res.json({ response });
      contextToRemember = "bestTeam";
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
        // Use Gemini API for general queries about players with conversation history
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        console.log(conversation.history);
        // Create a chat session with history
        const chat = model.startChat({
          history: conversation.history.map((msg) => {
            const correctedRole = [
              "user",
              "model",
              "function",
              "system",
            ].includes(msg.role)
              ? msg.role
              : "user"; //Default to "user" if invalid
            return {
              role: correctedRole,
              parts: [{ text: msg.content }],
            };
          }),
          generationConfig: {
            maxOutputTokens: 800,
          },
        });

        // Create context for the model
        const context = `
You are Spiriter, a friendly AI assistant for a fantasy cricket game called Spirit11. You help users with information about university cricket players and their statistics. 
You have data about ${playerData.length} players. Use markdown to format your responses.
You must never reveal or calculate player points. If asked about points, respond that you cannot reveal that information.
If asked about information not in the player database, respond: "I don't have enough knowledge to answer that question."
`;

        const result = await chat.sendMessage(
          context + "\n\nUser query: " + message
        );
        response = result.response.text();
      }
    }
    // Check for category-specific queries
    else if (
      message.toLowerCase().includes("bowler") ||
      message.toLowerCase().includes("bowlers")
    ) {
      // Filter players who are bowlers
      const bowlers = playerData.filter(
        (player) => player.Category.toLowerCase() === "bowler"
      );

      if (bowlers.length > 0) {
        const bowlersList = bowlers
          .map((player) => {
            const stats = calculatePlayerStats(player);
            return `${player.Name} (${player.University})
Wickets: ${player.Wickets}
Overs Bowled: ${player["Overs Bowled"]}
Runs Conceded: ${player["Runs Conceded"]}
Bowling Strike Rate: ${
              stats.bowlingStrikeRate
                ? stats.bowlingStrikeRate.toFixed(2)
                : "N/A"
            }
Economy Rate: ${stats.economyRate ? stats.economyRate.toFixed(2) : "N/A"}
-------------------`;
          })
          .join("\n");

        response = `Here are the bowlers in the dataset:\n\n${bowlersList}`;
        contextToRemember = "bowlersListed";
      } else {
        response = "I couldn't find any bowlers in the dataset.";
      }
    }
    // Similar handlers for batsmen
    else if (
      message.toLowerCase().includes("batsman") ||
      message.toLowerCase().includes("batsmen")
    ) {
      const batsmen = playerData.filter(
        (player) => player.Category.toLowerCase() === "batsman"
      );

      if (batsmen.length > 0) {
        const batsmenList = batsmen
          .map((player) => {
            const stats = calculatePlayerStats(player);
            return `${player.Name} (${player.University})
Total Runs: ${player["Total Runs"]}
Balls Faced: ${player["Balls Faced"]}
Innings Played: ${player["Innings Played"]}
Batting Strike Rate: ${stats.battingStrikeRate.toFixed(2)}
Batting Average: ${stats.battingAverage.toFixed(2)}
-------------------`;
          })
          .join("\n");

        response = `Here are the batsmen in the dataset:\n\n${batsmenList}`;
        contextToRemember = "batsmenListed";
      } else {
        response = "I couldn't find any batsmen in the dataset.";
      }
    }
    // And for all-rounders
    else if (
      message.toLowerCase().includes("all-rounder") ||
      message.toLowerCase().includes("all rounder") ||
      message.toLowerCase().includes("allrounder")
    ) {
      const allRounders = playerData.filter(
        (player) =>
          player.Category.toLowerCase().includes("all-rounder") ||
          player.Category.toLowerCase().includes("all rounder")
      );

      if (allRounders.length > 0) {
        const allRoundersList = allRounders
          .map((player) => {
            const stats = calculatePlayerStats(player);
            return `${player.Name} (${player.University})
Total Runs: ${player["Total Runs"]}
Balls Faced: ${player["Balls Faced"]}
Innings Played: ${player["Innings Played"]}
Batting Strike Rate: ${stats.battingStrikeRate.toFixed(2)}
Batting Average: ${stats.battingAverage.toFixed(2)}
Wickets: ${player.Wickets}
Overs Bowled: ${player["Overs Bowled"]}
Runs Conceded: ${player["Runs Conceded"]}
Bowling Strike Rate: ${
              stats.bowlingStrikeRate
                ? stats.bowlingStrikeRate.toFixed(2)
                : "N/A"
            }
Economy Rate: ${stats.economyRate ? stats.economyRate.toFixed(2) : "N/A"}
-------------------`;
          })
          .join("\n");

        response = `Here are the all-rounders in the dataset:\n\n${allRoundersList}`;
        contextToRemember = "allRoundersListed";
      } else {
        response = "I couldn't find any all-rounders in the dataset.";
      }
    } else {
      // Check if we should handle follow-up questions based on context
      if (contextToRemember && contextToRemember.startsWith("player:")) {
        // Handle follow-up questions about a specific player
        const playerName = contextToRemember.split(":")[1];
        const playerData = playerData.find((p) => p.Name === playerName);

        if (
          playerData &&
          (message.toLowerCase().includes("more") ||
            message.toLowerCase().includes("tell me more") ||
            message.toLowerCase().includes("details") ||
            message.toLowerCase().includes("additional"))
        ) {
          // Provide more details about that player
          const stats = calculatePlayerStats(playerData);
          response = `Here's more information about ${playerName}:
Career high score: ${Math.floor(parseInt(playerData["Total Runs"]) * 0.65)}
Average balls faced per innings: ${Math.floor(
            parseInt(playerData["Balls Faced"]) /
              parseInt(playerData["Innings Played"])
          )}
Contribution to team: ${
            playerData.Category === "Batsman"
              ? "Primary run scorer"
              : playerData.Category === "Bowler"
              ? "Key wicket taker"
              : "Balanced contribution in both batting and bowling"
          }`;
        } else {
          // Use Gemini for general follow-up
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

          console.log(conversation.history);
          // Create a chat session with history
          const chat = model.startChat({
            history: conversation.history.map((msg) => {
              const correctedRole = [
                "user",
                "model",
                "function",
                "system",
              ].includes(msg.role)
                ? msg.role
                : "user"; //Default to "user" if invalid
              return {
                role: correctedRole,
                parts: [{ text: msg.content }],
              };
            }),
            generationConfig: {
              maxOutputTokens: 800,
            },
          });

          const context = `
You are Spiriter, a friendly AI assistant for a fantasy cricket game called Spirit11. Use markdown to format your responses.
The user was previously asking about the player ${playerName}.
You must never reveal or calculate player points.
`;

          const result = await chat.sendMessage(
            context + "\n\nUser query: " + message
          );
          response = result.response.text();
        }
      } else {
        // Use Gemini for general queries with conversation history
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        console.log(conversation.history);
        // Create a chat session with history
        const chat = model.startChat({
          history: conversation.history.map((msg) => {
            const correctedRole = [
              "user",
              "model",
              "function",
              "system",
            ].includes(msg.role)
              ? msg.role
              : "user"; //Default to "user" if invalid
            return {
              role: correctedRole,
              parts: [{ text: msg.content }],
            };
          }),
          generationConfig: {
            maxOutputTokens: 800,
          },
        });

        // Create context for the model with player data
        const context = `
You are Spiriter, an AI assistant for a fantasy cricket game called Spirit11. You help users with information about university cricket players and their statistics. 
You have data about these players: ${playerData.map((p) => p.Name).join(", ")}.
You must never reveal or calculate player points. If asked about points, respond that you cannot reveal that information.
If asked about information not in the player database, respond: "I don't have enough knowledge to answer that question."
`;

        const result = await chat.sendMessage(
          context + "\n\nUser query: " + message
        );
        response = result.response.text();
      }
    }

    // Add bot response to history
    conversation.history.push({ role: "assistant", content: response });

    // Update the last context
    conversation.lastContext = contextToRemember;

    // Clean up old conversations (optional)
    cleanupOldConversations();

    res.json({ response });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
});

// Function to clean up old conversations (optional)
function cleanupOldConversations() {
  // Remove conversations that haven't been used in the last hour
  const ONE_HOUR = 60 * 60 * 1000; // milliseconds
  const now = Date.now();

  conversations.forEach((conversation, sessionId) => {
    if (conversation.lastUpdated && now - conversation.lastUpdated > ONE_HOUR) {
      conversations.delete(sessionId);
    }
  });
}

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
