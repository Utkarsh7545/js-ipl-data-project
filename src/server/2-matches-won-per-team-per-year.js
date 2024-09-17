// 2: Number of matches won per team per year in IPL.

import match from "../data/matches.json" assert { type: "json" };
import fs from "fs";

const dataPath = "./src/public/output/matchesWonPerTeamPerYear.json";

const matches_Won_Per_Team_Per_Year = (data) => {
    
    return data.reduce((result, match) => {
        const year = match.season;
        const winningTeam = match.winner;

        if(year && winningTeam){
            if(!result[year]){
                result[year] = {};
            }
            if(!result[year][winningTeam]){
                result[year][winningTeam] = 1;
            }
            else{
                result[year][winningTeam]++;
            }
        }
        return result;
    }, {})
}

let matchesRecord = matches_Won_Per_Team_Per_Year(match);

fs.writeFileSync(dataPath, JSON.stringify(matchesRecord, null, 2), "utf-8");

