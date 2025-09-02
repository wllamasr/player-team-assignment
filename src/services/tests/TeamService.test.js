const seedrandom = require("seedrandom");
const Player = require("../../models/Player");
const TeamService = require("../TeamService");

const config = {
  fairness: {
    engagementWeight: { points: 1, daysActive: 100 },
  },
};

describe("TeamService", () => {
  const players = [
    new Player({ player_id: "1", historical_points_earned: "10", days_active_last_30: "1" }),
    new Player({ player_id: "2", historical_points_earned: "20", days_active_last_30: "2" }),
    new Player({ player_id: "3", historical_points_earned: "30", days_active_last_30: "3" }),
    new Player({ player_id: "4", historical_points_earned: "40", days_active_last_30: "4" }),
  ];

  it("debería asignar equipos de forma balanceada", () => {
    const rng = seedrandom("test-seed");
    const service = new TeamService([...players], config, rng, 2);

    const assigned = service.assignTeams();

    const team1 = assigned.filter((p) => p.new_team === 1);
    const team2 = assigned.filter((p) => p.new_team === 2);

    expect(team1.length).toBe(team2.length); // balanceado
  });

  it("debería generar un resumen con promedio de engagement", () => {
    const rng = seedrandom("test-seed");
    const service = new TeamService([...players], config, rng, 2);
    service.assignTeams();

    const summary = service.summarize();

    expect(summary.length).toBe(2);
    expect(summary[0]).toHaveProperty("team");
    expect(summary[0]).toHaveProperty("size");
    expect(summary[0]).toHaveProperty("avgScore");
  });
});