class Player {
  constructor(row) {
    this.player_id = row.player_id;
    this.historical_points_earned = Number(row.historical_points_earned || 0);
    this.days_active_last_30 = Number(row.days_active_last_30 || 0);
    this.new_team = row.new_team ? Number(row.new_team) : null;
  }

  getEngagementScore(weights) {
    return (
      this.historical_points_earned * weights.points +
      this.days_active_last_30 * weights.daysActive
    );
  }
}

module.exports = Player;