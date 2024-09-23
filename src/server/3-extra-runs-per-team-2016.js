// 3: Extra runs conceded per team in the year 2016

import match from "../data/matches.json" assert { type: "json" };
import delivery from "../data/deliveries.json" assert { type: "json" };
import fs from "fs";

const dataPath = "./src/public/output/extraRunsPerTeam2016.json";

const extraRunsPerTeam2016 = (match, delivery, year) => {
  const id = match
    .filter((matches) => matches.season === year)
    .map((matches) => matches.id);
  
    return delivery.reduce((extraRunPerTeam2016, matches) => {
        if(id.includes(matches.match_id)){
            if(!extraRunPerTeam2016[matches.bowling_team]){
                extraRunPerTeam2016[matches.bowling_team] = 0;
            }
            extraRunPerTeam2016[matches.bowling_team] += parseInt(matches.extra_runs);
        }
        return extraRunPerTeam2016;
    }, {});
};

let matchesRecord = extraRunsPerTeam2016(match, delivery, "2016");

fs.writeFileSync(dataPath, JSON.stringify(matchesRecord, null, 2), "utf-8");

