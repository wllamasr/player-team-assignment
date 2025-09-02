const minimist = require("minimist");
const seedrandom = require("seedrandom");
const fs = require("fs");
const config = require("./config");
const CsvService = require("./services/CsvService");
const TeamService = require("./services/TeamService");

async function main() {
  const args = minimist(process.argv.slice(2));
  const numTeams = Number(args.teams || 3);
  const seed = args.seed || "default";
  const force = args.force === true || args.force === "true";

  let players;

  // If an output file exists and --force is not set, reuse it
  if (fs.existsSync(config.outputCSV) && !force) {
    console.log(`Using an existing teams file: ${config.outputCSV}`);
    players = await CsvService.loadCSV(config.outputCSV);
  } else {
    // If forcing and file exists, remove it to ensure a clean write
    if (force && fs.existsSync(config.outputCSV)) {
      fs.unlinkSync(config.outputCSV);
    }

    console.log("Creating a new file after shuffling teams...");
    // Load input players (level_a_players.csv)
    players = await CsvService.loadCSV(config.inputCSV);

    // Build deterministic assignment
    const rng = seedrandom(seed);
    const teamService = new TeamService(players, config, rng, numTeams);
    players = teamService.assignTeams();

    // Persist result
    CsvService.saveCSV(players, config.outputCSV);
  }

  // Print assignments
  console.log("\nPlayer Assignments:");
  players.forEach((p) => {
    console.log(`Player ${p.player_id} → Team ${p.new_team}`);
  });

  // Print summary
  console.log("\nSummary:");
  const summaryService = new TeamService(players, config, seedrandom(seed), numTeams);
  summaryService.summarize().forEach((s) => {
    console.log(`${s.team}: ${s.size} players, Avg Engagement = ${s.avgScore}`);
  });

  console.log(
    "\nJustification: Teams are generated reproducibly and balanced in size and activity, " +
      "ensuring the outcome feels fair and non-arbitrary."
  );
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});