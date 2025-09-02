const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

describe("index.js integration tests", () => {
  const outputCsv = path.join(process.cwd(), "data", "players_with_teams.csv");

  // Ensure a clean slate before each test
  beforeEach(() => {
    if (fs.existsSync(outputCsv)) fs.unlinkSync(outputCsv);
  });

  test("should run without crashing and create output CSV", () => {
    execSync("node src/index.js --teams 3 --seed 123 --force", { stdio: "ignore" });
    expect(fs.existsSync(outputCsv)).toBe(true);
  });

  test("should produce consistent results with the same seed", () => {
    const run = () =>
      execSync("node src/index.js --teams 3 --seed 99 --force").toString();

    const out1 = run();
    const out2 = run();

    // Compare only the deterministic "Player Assignments" block
    const extractAssignments = (stdout) => {
      const start = stdout.indexOf("Player Assignments:");
      const end = stdout.indexOf("\nSummary:");
      return stdout.slice(start, end).trim();
    };

    expect(extractAssignments(out1)).toBe(extractAssignments(out2));
  });

  test("should produce identical CSV output with the same seed", () => {
    const runAndReadCsv = () => {
      execSync("node src/index.js --teams 3 --seed 99 --force", { stdio: "ignore" });
      return fs.readFileSync(outputCsv, "utf8");
    };

    const csv1 = runAndReadCsv();
    const csv2 = runAndReadCsv();
    expect(csv1).toBe(csv2);
  });

  test("should produce different results with different seeds", () => {
    const runAndReadCsv = (seed) => {
      execSync(`node src/index.js --teams 3 --seed ${seed} --force`, { stdio: "ignore" });
      return fs.readFileSync(outputCsv, "utf8");
    };

    const csv1 = runAndReadCsv(1);
    const csv2 = runAndReadCsv(2);

    // CSVs should not be identical with different seeds
    expect(csv1).not.toBe(csv2);
  });

  test("should respect the --teams parameter", () => {
    execSync("node src/index.js --teams 5 --seed 77 --force", { stdio: "ignore" });
    const csv = fs.readFileSync(outputCsv, "utf8");

    // Ensure at least one team number equals "5"
    const hasTeam5 = csv.split("\n").some((line) => line.includes(",5"));
    expect(hasTeam5).toBe(true);
  });
});