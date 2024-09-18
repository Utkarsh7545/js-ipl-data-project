// 4: Top 10 economical bowlers in the year 2015

import match from "../data/matches.json" assert { type: "json" };
import delivery from "../data/deliveries.json" assert { type: "json" };
import fs from "fs";

const dataPath = "./src/public/output/top10EconomicalBowlers2015.json";

const top10_Economical_Bowlers_2015 = (match, delivery, year) => {
  const id = match
    .filter((value) => value.season === year)
    .map((matchId) => matchId.id);

  const result = delivery.reduce((acc, curr) => {
    if (id.includes(curr.match_id)) {
      if (!acc[curr.bowler]) {
        acc[curr.bowler] = { runs: 0, balls: 0 };
      }
      acc[curr.bowler].runs += parseInt(curr.total_runs);
      if (curr.wide_runs === "0" && curr.noball_runs === "0") {
        acc[curr.bowler].balls++;
      }
    }
    return acc;
  }, {});

  return Object.entries(result)
    .reduce((acc, curr) => {
      const run = curr[1].runs;
      const over = curr[1].balls / 6;
      const economy = (run / over).toFixed(2);

      const obj = { Bowler: curr[0], Economy: economy };

      acc.push(obj);
      return acc;
    }, [])
    .sort((a, b) => a.Economy - b.Economy)
    .slice(0, 10);
};

let matchesRecord = top10_Economical_Bowlers_2015(match, delivery, "2015");

fs.writeFileSync(dataPath, JSON.stringify(matchesRecord, null, 2), "utf-8");
