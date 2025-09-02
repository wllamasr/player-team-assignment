const path = require("path");

module.exports = {
  inputCSV: path.join(__dirname, "../data/level_a_players.csv"),
  outputCSV: path.join(__dirname, "../data/players_with_teams.csv"),
  fairness: {
    engagementWeight: { points: 1, daysActive: 100 },
  },
};