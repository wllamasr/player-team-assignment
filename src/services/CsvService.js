const fs = require("fs");
const csv = require("csv-parser");
const Player = require("../models/Player");

class CsvService {
  static async loadCSV(csvPath) {
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(csvPath)
        .pipe(csv())
        .on("data", (row) => results.push(new Player(row)))
        .on("end", () => resolve(results))
        .on("error", reject);
    });
  }

  static saveCSV(players, csvPath) {
    const headers = Object.keys(players[0]).join(",");
    const rows = players.map((p) => Object.values(p).join(","));
    const csvContent = [headers, ...rows].join("\n");

    fs.writeFileSync(csvPath, csvContent, "utf8");
  }
}

module.exports = CsvService;