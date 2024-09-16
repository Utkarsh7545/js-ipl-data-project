// 3: Extra runs conceded per team in the year 2016

import match from "../data/matches.json" assert { type: "json" };
import delivery from "../data/deliveries.json" assert { type: "json" };
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataPath = join(__dirname, "../public/output/extraRunsPerTeam2016.json");

const extra_Runs_Per_Team_2016 = (match, delivery) => {
    const result = {};
    const matchId = [];

    for(let value of match){
        if(value.season === "2016"){
            matchId.push(value.id);
        }
    }

    for(let value of delivery){
        if(matchId.includes(value.match_id)){
            if(!result[value.bowling_team]){
                result[value.bowling_team] = 0;
            }
            result[value.bowling_team] += parseInt(value.extra_runs);  
        }
    }
    return result;
}

let matchesRecord = extra_Runs_Per_Team_2016(match, delivery);

fs.writeFileSync(dataPath, JSON.stringify(matchesRecord, null, 2), "utf-8");

