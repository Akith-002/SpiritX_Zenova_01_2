const { GoogleGenerativeAI } = require("@google/generative-ai");
const csv = require("csv-parser");
const fs = require("fs");
const PlayerModel = require("../models/player.model"); // Assuming you have a Player model

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Store conversation history by session ID
const conversations = new Map();

// Calculate player stats
function calculatePlayerStats(player) {
  const totalRuns = parseInt(player.totalRuns) || 0;
  const ballsFaced = parseInt(player.ballsFaced) || 1;
  const inningsPlayed = parseInt(player.inningsPlayed) || 1;

  const battingStrikeRate = (totalRuns / ballsFaced) * 100;
  const battingAverage = totalRuns / inningsPlayed;

  const wickets = parseInt(player.wickets) || 0;
  const oversBowled = parseInt(player.oversBowled) || 0;
  const runsConceded = parseInt(player.runsConceded) || 0;

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

// Clean up old conversations
function cleanupOldConversations() {
  const ONE_HOUR = 60 * 60 * 1000;
  const now = Date.now();

  conversations.forEach((conversation, sessionId) => {
    if (conversation.lastUpdated && now - conversation.lastUpdated > ONE_HOUR) {
      conversations.delete(sessionId);
    }
  });
}

// Function to handle best team selection
async function handleBestTeamQuery(playerData) {
  // Calculate points for each player
  const playersWithPoints = playerData.map((player) => {
    const stats = calculatePlayerStats(player);
    const points =
      stats.battingStrikeRate / 5 +
      stats.battingAverage * 0.8 +
      (500 / (stats.bowlingStrikeRate || 1) + 140 / (stats.economyRate || 1));

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
  return `Here's my recommendation for the best possible team of 11 players:\n\n${bestTeam
    .map(
      (player, index) =>
        `${index + 1}. ${player.name} (${player.university}) - ${
          player.category
        }`
    )
    .join("\n")}`;
}

// Function to handle player statistics
async function handlePlayerStatsQuery(message, playerData) {
  const foundPlayer = playerData.find((p) =>
    message.toLowerCase().includes(p.name.toLowerCase())
  );

  if (foundPlayer) {
    const stats = calculatePlayerStats(foundPlayer);

    return `
Here are ${foundPlayer.name}'s statistics:
University: ${foundPlayer.university}
Category: ${foundPlayer.category}
Total Runs: ${foundPlayer.totalRuns}
Balls Faced: ${foundPlayer.ballsFaced}
Innings Played: ${foundPlayer.inningsPlayed}
Batting Strike Rate: ${stats.battingStrikeRate.toFixed(2)}
Batting Average: ${stats.battingAverage.toFixed(2)}
${
  foundPlayer.category !== "Batsman"
    ? `Wickets: ${foundPlayer.wickets}
Overs Bowled: ${foundPlayer.oversBowled}
Runs Conceded: ${foundPlayer.runsConceded}
Bowling Strike Rate: ${
        stats.bowlingStrikeRate ? stats.bowlingStrikeRate.toFixed(2) : "N/A"
      }
Economy Rate: ${stats.economyRate ? stats.economyRate.toFixed(2) : "N/A"}`
    : ""
}
`;
  }
  return null;
}

// Function to handle category-specific queries (bowlers)
async function handleBowlersQuery(playerData) {
  const bowlers = playerData.filter(
    (player) => player.category.toLowerCase() === "bowler"
  );

  if (bowlers.length > 0) {
    const bowlersList = bowlers
      .map((player) => {
        const stats = calculatePlayerStats(player);
        return `${player.name} (${player.university})
Wickets: ${player.wickets}
Overs Bowled: ${player.oversBowled}
Runs Conceded: ${player.runsConceded}
Bowling Strike Rate: ${
          stats.bowlingStrikeRate ? stats.bowlingStrikeRate.toFixed(2) : "N/A"
        }
Economy Rate: ${stats.economyRate ? stats.economyRate.toFixed(2) : "N/A"}
-------------------`;
      })
      .join("\n");

    return `Here are the bowlers in the dataset:\n\n${bowlersList}`;
  }
  return "I couldn't find any bowlers in the dataset.";
}

// Function to handle category-specific queries (batsmen)
async function handleBatsmenQuery(playerData) {
  const batsmen = playerData.filter(
    (player) => player.category.toLowerCase() === "batsman"
  );

  if (batsmen.length > 0) {
    const batsmenList = batsmen
      .map((player) => {
        const stats = calculatePlayerStats(player);
        return `${player.name} (${player.university})
Total Runs: ${player.totalRuns}
Balls Faced: ${player.ballsFaced}
Innings Played: ${player.inningsPlayed}
Batting Strike Rate: ${stats.battingStrikeRate.toFixed(2)}
Batting Average: ${stats.battingAverage.toFixed(2)}
-------------------`;
      })
      .join("\n");

    return `Here are the batsmen in the dataset:\n\n${batsmenList}`;
  }
  return "I couldn't find any batsmen in the dataset.";
}

// Function to handle category-specific queries (all-rounders)
async function handleAllRoundersQuery(playerData) {
  const allRounders = playerData.filter(
    (player) =>
      player.category.toLowerCase().includes("all-rounder") ||
      player.category.toLowerCase().includes("all rounder")
  );

  if (allRounders.length > 0) {
    const allRoundersList = allRounders
      .map((player) => {
        const stats = calculatePlayerStats(player);
        return `${player.name} (${player.university})
Total Runs: ${player.totalRuns}
Balls Faced: ${player.ballsFaced}
Innings Played: ${player.inningsPlayed}
Batting Strike Rate: ${stats.battingStrikeRate.toFixed(2)}
Batting Average: ${stats.battingAverage.toFixed(2)}
Wickets: ${player.wickets}
Overs Bowled: ${player.oversBowled}
Runs Conceded: ${player.runsConceded}
Bowling Strike Rate: ${
          stats.bowlingStrikeRate ? stats.bowlingStrikeRate.toFixed(2) : "N/A"
        }
Economy Rate: ${stats.economyRate ? stats.economyRate.toFixed(2) : "N/A"}
-------------------`;
      })
      .join("\n");

    return `Here are the all-rounders in the dataset:\n\n${allRoundersList}`;
  }
  return "I couldn't find any all-rounders in the dataset.";
}

// Function to handle Gemini AI queries
async function handleGeminiQuery(message, history, playerData) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Create a chat session with history
  const chat = model.startChat({
    history: history.map((msg) => {
      const correctedRole = ["user", "model", "function", "system"].includes(
        msg.role
      )
        ? msg.role
        : "user";
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
You have data about these players: ${playerData.map((p) => p.name).join(", ")}.
You must never reveal or calculate player points. If asked about points, respond that you cannot reveal that information.
If asked about information not in the player database, respond: "I don't have enough knowledge to answer that question."
`;

  const result = await chat.sendMessage(context + "\n\nUser query: " + message);
  return result.response.text();
}

// Main chat handler
exports.chatWithSpiritter = async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    // Get player data from database
    let playerData = await PlayerModel.find({}).lean();

    // Create a new conversation if this session doesn't exist
    if (!conversations.has(sessionId)) {
      conversations.set(sessionId, {
        history: [],
        lastContext: null,
        lastUpdated: Date.now(),
      });
    }

    // Get the conversation for this session
    const conversation = conversations.get(sessionId);
    conversation.lastUpdated = Date.now();

    // Add user message to history
    conversation.history.push({ role: "user", content: message });

    let response = "";
    let contextToRemember = conversation.lastContext;

    // Check message content and route to appropriate handler
    if (
      message.toLowerCase().includes("best team") ||
      message.toLowerCase().includes("best possible team")
    ) {
      response = await handleBestTeamQuery(playerData);
      contextToRemember = "bestTeam";
    } else if (
      message.toLowerCase().includes("stats") ||
      message.toLowerCase().includes("statistics")
    ) {
      const playerStatsResponse = await handlePlayerStatsQuery(
        message,
        playerData
      );
      if (playerStatsResponse) {
        response = playerStatsResponse;
      } else {
        // Use Gemini for general stats queries
        response = await handleGeminiQuery(
          message,
          conversation.history,
          playerData
        );
      }
    } else if (
      message.toLowerCase().includes("bowler") ||
      message.toLowerCase().includes("bowlers")
    ) {
      response = await handleBowlersQuery(playerData);
      contextToRemember = "bowlersListed";
    } else if (
      message.toLowerCase().includes("batsman") ||
      message.toLowerCase().includes("batsmen")
    ) {
      response = await handleBatsmenQuery(playerData);
      contextToRemember = "batsmenListed";
    } else if (
      message.toLowerCase().includes("all-rounder") ||
      message.toLowerCase().includes("all rounder") ||
      message.toLowerCase().includes("allrounder")
    ) {
      response = await handleAllRoundersQuery(playerData);
      contextToRemember = "allRoundersListed";
    } else {
      // Handle follow-up questions or general queries
      if (contextToRemember && contextToRemember.startsWith("player:")) {
        // Handle follow-up questions about a specific player
        const playerName = contextToRemember.split(":")[1];
        const player = playerData.find((p) => p.name === playerName);

        if (
          player &&
          (message.toLowerCase().includes("more") ||
            message.toLowerCase().includes("tell me more") ||
            message.toLowerCase().includes("details") ||
            message.toLowerCase().includes("additional"))
        ) {
          // Provide more details about that player
          const stats = calculatePlayerStats(player);
          response = `Here's more information about ${playerName}:
Career high score: ${Math.floor(parseInt(player.totalRuns) * 0.65)}
Average balls faced per innings: ${Math.floor(
            parseInt(player.ballsFaced) / parseInt(player.inningsPlayed)
          )}
Contribution to team: ${
            player.category === "Batsman"
              ? "Primary run scorer"
              : player.category === "Bowler"
              ? "Key wicket taker"
              : "Balanced contribution in both batting and bowling"
          }`;
        } else {
          // Use Gemini for general follow-up
          response = await handleGeminiQuery(
            message,
            conversation.history,
            playerData
          );
        }
      } else {
        // Use Gemini for general queries
        response = await handleGeminiQuery(
          message,
          conversation.history,
          playerData
        );
      }
    }

    // Add bot response to history
    conversation.history.push({ role: "assistant", content: response });

    // Update the last context
    conversation.lastContext = contextToRemember;

    // Clean up old conversations
    cleanupOldConversations();

    res.json({ response });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};
