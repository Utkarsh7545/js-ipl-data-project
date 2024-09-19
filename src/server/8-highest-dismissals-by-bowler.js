// 8: Find the highest number of times one player has been dismissed by another player

import delivery from "../data/deliveries.json" assert { type: "json" };
import fs from "fs";

const dataPath = "./src/public/output/highestDismissalsByBowler.json";

const highest_Dismissals_By_Bowler = (delivery) => {
  let mostDismissedBatsman = "";
  let mostWicketTaker = "";
  let mostDismissals = 0;

  const dismissals = delivery.reduce((acc, curr) => {
    const batsman = curr.batsman;
    const bowler = curr.bowler;
    const dismissal = curr.dismissal_kind;

    if (dismissal && dismissal !== "run out") {
      if (!acc[bowler]) {
        acc[bowler] = {};
      }
      if (!acc[bowler][batsman]) {
        acc[bowler][batsman] = 0;
      }
      acc[bowler][batsman]++;

      if (mostDismissals < acc[bowler][batsman]) {
        mostDismissals = acc[bowler][batsman];
        mostDismissedBatsman = batsman;
        mostWicketTaker = bowler;
      }
    }

    return acc;
  }, {});

  return {
    Batsman: mostDismissedBatsman,
    Bowler: mostWicketTaker,
    Dismissals: mostDismissals,
  };
};

let matchesRecord = highest_Dismissals_By_Bowler(delivery);

fs.writeFileSync(dataPath, JSON.stringify(matchesRecord, null, 2), "utf-8");

