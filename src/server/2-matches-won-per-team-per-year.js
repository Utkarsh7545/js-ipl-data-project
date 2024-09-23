// 2: Number of matches won per team per year in IPL.

import match from "../data/matches.json" assert { type: "json" };
import fs from "fs";

const dataPath = "./src/public/output/matchesWonPerTeamPerYear.json";

const matchesWonPerTeamPerYear = (match) => {
    
    return match.reduce((matchWonPerTeamPerYear, matches) => {
        if(!matchWonPerTeamPerYear[matches.season]){
            matchWonPerTeamPerYear[matches.season] = {};
        }
        if(!matchWonPerTeamPerYear[matches.season][matches.winner]){
            matchWonPerTeamPerYear[matches.season][matches.winner] = 0;
        }
        matchWonPerTeamPerYear[matches.season][matches.winner]++;
        return matchWonPerTeamPerYear;
    }, {})
}

let matchesRecord = matchesWonPerTeamPerYear(match);

fs.writeFileSync(dataPath, JSON.stringify(matchesRecord, null, 2), "utf-8");

