const shuffle = require("../utils/shuffle");

class TeamService {
  constructor(players, config, rng, numTeams) {
    this.players = players;
    this.config = config;
    this.rng = rng;
    this.numTeams = numTeams;
  }

  assignTeams() {
    // Sort by engagement
    const sorted = this.players.sort(
      (a, b) =>
        b.getEngagementScore(this.config.fairness.engagementWeight) -
        a.getEngagementScore(this.config.fairness.engagementWeight)
    );

    const shuffled = shuffle(sorted, this.rng);

    shuffled.forEach((p, i) => {
      p.new_team = (i % this.numTeams) + 1;
    });

    return shuffled;
  }

  summarize() {
    const summaries = [];
    for (let i = 1; i <= this.numTeams; i++) {
      const team = this.players.filter((p) => p.new_team === i);
      const size = team.length;
      const avgScore =
        team.reduce(
          (sum, p) =>
            sum + p.getEngagementScore(this.config.fairness.engagementWeight),
          0
        ) / size;

      summaries.push({
        team: `Team ${i}`,
        size,
        avgScore: avgScore.toFixed(2),
      });
    }
    return summaries;
  }
}

module.exports = TeamService;