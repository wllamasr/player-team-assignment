const Player = require("../Player");

describe("Player model", () => {
  it("debería calcular el engagement score correctamente", () => {
    const row = {
      player_id: "1",
      historical_points_earned: "50",
      days_active_last_30: "10",
    };

    const player = new Player(row);
    const weights = { points: 1, daysActive: 100 };

    expect(player.getEngagementScore(weights)).toBe(50 + 10 * 100);
  });

  it("debería asignar 0 si no hay datos", () => {
    const row = { player_id: "2" };
    const player = new Player(row);
    const weights = { points: 1, daysActive: 100 };

    expect(player.getEngagementScore(weights)).toBe(0);
  });
});
