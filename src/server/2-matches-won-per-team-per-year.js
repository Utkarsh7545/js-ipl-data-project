// 2: Number of matches won per team per year in IPL.

import match from "../data/matches.json" assert { type: "json" };
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataPath = join(__dirname, "../public/output/matchesWonPerTeamPerYear.json");

const matches_Won_Per_Team_Per_Year = (data) => {
    const result = {};

    for(let i=0; i<data.length; i++){
    const year = data[i].season;
    const winningTeam = data[i].winner;
        if (winningTeam !== null && year !== null) {
            if(!result[year]){
                result[year] = {};
            }
            if(result[year][winningTeam]){
                result[year][winningTeam]++;
            }
            else{
                result[year][winningTeam] = 1;
            }
        }
    }
    return result;
}

let matchesRecord = matches_Won_Per_Team_Per_Year(match);

fs.writeFileSync(dataPath, JSON.stringify(matchesRecord, null, 2), "utf-8");

