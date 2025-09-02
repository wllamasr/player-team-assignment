# Decisions

- **Saving shuffled teams into a new CSV file (`players_with_teams.csv`)**  
  We chose to persist the shuffled teams in a new file so that future runs can reuse the existing assignments without reshuffling unnecessarily. This improves reproducibility and efficiency.

- **Engagement Metric for Balancing**  
  We decided to balance teams based on an "engagement score" calculated from activity-related fields such as `historical_points_earned`, `historical_messages_sent`, and `days_active_last_30`. This was chosen because it reflects actual player participation and feels fair to the community. That was done in `src/models/Player.js`

- **Use of deterministic randomness via `seedrandom`**  
  To make the shuffle reproducible, we introduced seeding for random number generation. This ensures the same input always produces the same output, which builds user trust. This happens in the `src/index.js` file.

- **Keeping CSV parsing streaming-based**  
  We decided to use `csv-parser` with streams to handle potentially large CSV files efficiently, avoiding memory overload from loading all players into memory at once.
