// 3: Extra runs conceded per team in the year 2016

import match from "../data/matches.json" assert { type: "json" };
import delivery from "../data/deliveries.json" assert { type: "json" };
import fs from "fs";

const dataPath = "./src/public/output/extraRunsPerTeam2016.json";

const extra_Runs_Per_Team_2016 = (match, delivery, year) => {
  const id = match
    .filter((value) => value.season === year)
    .map((value) => value.id);
  
    return delivery.reduce((acc, curr) => {
        if(id.includes(curr.match_id)){
            if(!acc[curr.bowling_team]){
                acc[curr.bowling_team] = 0;
            }
            acc[curr.bowling_team] += parseInt(curr.extra_runs);
        }
        return acc;
    }, {});
};

let matchesRecord = extra_Runs_Per_Team_2016(match, delivery, "2016");

fs.writeFileSync(dataPath, JSON.stringify(matchesRecord, null, 2), "utf-8");
