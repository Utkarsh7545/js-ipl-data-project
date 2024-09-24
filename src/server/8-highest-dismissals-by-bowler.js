// 8: Find the highest number of times one player has been dismissed by another player

import delivery from "../data/deliveries.json" assert { type: "json" };
import fs from "fs";

const dataPath = "./src/public/output/highestDismissalsByBowler.json";

const highestDismissalsByBowler = (delivery) => {
  let mostDismissedBatsman = "";
  let mostWicketTaker = "";
  let mostDismissals = 0;

  const dismissals = delivery.reduce((highestDismissals, matches) => {
    const batsman = matches.batsman;
    const bowler = matches.bowler;
    const dismissal = matches.dismissal_kind;

    if (dismissal && dismissal !== "run out") {
      if (!highestDismissals[bowler]) {
        highestDismissals[bowler] = {};
      }
      if (!highestDismissals[bowler][batsman]) {
        highestDismissals[bowler][batsman] = 0;
      }
      highestDismissals[bowler][batsman]++;

      if (mostDismissals < highestDismissals[bowler][batsman]) {
        mostDismissals = highestDismissals[bowler][batsman];
        mostDismissedBatsman = batsman;
        mostWicketTaker = bowler;
      }
    }

    return highestDismissals;
  }, {});

  return {
    Batsman: mostDismissedBatsman,
    Bowler: mostWicketTaker,
    Dismissals: mostDismissals,
  };
};

let matchesRecord = highestDismissalsByBowler(delivery);

fs.writeFileSync(dataPath, JSON.stringify(matchesRecord, null, 2), "utf-8");

