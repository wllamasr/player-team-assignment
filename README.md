# Player Team Assignment

## How to run and useful commands

1. **Install dependencies**  
```bash
   npm install
```

2. **Run with custom arguments**
```bash
   npm start -- --teams 3 --seed 42
```

3. **Quick dev run** (default example with 3 teams and seed=42)
```bash
   npm run dev
```

4. **Shuffle with a specific number of teams (seed not required)**
```bash
   npm run shuffle -- 4
```

5. **Run tests**
```bash
   npm test
```
## Engagement Metric and Modeling Choice

I chose to use a weighted engagement score as the balancing metric. Engagement is calculated combining different aspects of player activity, such as points, messages, and activity.

For simplicity, we used the following formula:
```
engagement_score = (historical_events_participated * 2) +
(historical_points_earned * 0.5) +
(historical_messages_sent * 1) +
(days_active_last_30 * 3)
```

This metric was chosen because it reflects both long-term activity (events and points earned) and recent consistency (messages sent and days active in the last 30).  
By balancing teams based on this score, we ensure that teams not only have similar sizes but also comparable levels of active and engaged players, making the shuffle feel fair to the community.

## Approach (Plain Language)

The program reads player data from the file `data/level_a_players.csv`, calculates an engagement score for each player based on their past participation and activity, and distributes players across teams so they are roughly balanced in both **size** and **engagement level**.  
After shuffling, the results are saved into a new file `data/players_with_teams.csv`, ensuring that the original input remains unchanged and the output can be reused without overwriting the source data.  
The process is deterministic when using a `--seed`, meaning the same input always produces the same output.

## Libraries Used

- **csv-parser**  
  Used to read and parse the original `level_a_players.csv` file as a stream, converting CSV rows into JavaScript objects for processing.

- **minimist**  
  Used to parse command-line arguments (e.g., `--teams 3 --seed 42`), making the program configurable from the terminal.

- **seedrandom**  
  Used to introduce deterministic randomness in the shuffle process. By providing a `--seed` argument, the shuffle will always produce the same result, ensuring reproducibility.