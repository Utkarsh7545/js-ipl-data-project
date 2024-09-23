// 4: Top 10 economical bowlers in the year 2015

import match from "../data/matches.json" assert { type: "json" };
import delivery from "../data/deliveries.json" assert { type: "json" };
import fs from "fs";

const dataPath = "./src/public/output/top10EconomicalBowlers2015.json";

const top10EconomicalBowlers2015 = (match, delivery, year) => {
  const id = match
    .filter((matchId) => matchId.season === year)
    .map((matchId) => matchId.id);

  const bowlersEconomy = delivery.reduce((team, matches) => {
    if (id.includes(matches.match_id)) {
      if (!team[matches.bowler]) {
        team[matches.bowler] = { runs: 0, balls: 0 };
      }
      team[matches.bowler].runs += parseInt(matches.total_runs);
      if (matches.wide_runs === "0" && matches.noball_runs === "0") {
        team[matches.bowler].balls++;
      }
    }
    return team;
  }, {});

  return Object.entries(bowlersEconomy)
    .reduce((bowler, stats) => {
      const run = stats[1].runs;
      const over = stats[1].balls / 6;
      const economy = (run / over).toFixed(2);

      const bowlerStats = { Bowler: stats[0], Economy: economy };

      bowler.push(bowlerStats);
      return bowler;
    }, [])
    .sort((a, b) => a.Economy - b.Economy)
    .slice(0, 10);
};

let matchesRecord = top10EconomicalBowlers2015(match, delivery, "2015");

fs.writeFileSync(dataPath, JSON.stringify(matchesRecord, null, 2), "utf-8");

