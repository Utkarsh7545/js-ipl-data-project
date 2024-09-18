// 2: Number of matches won per team per year in IPL.

import match from "../data/matches.json" assert { type: "json" };
import fs from "fs";

const dataPath = "./src/public/output/matchesWonPerTeamPerYear.json";

const matches_Won_Per_Team_Per_Year = (data) => {
    
    return data.reduce((acc, curr) => {
        if(!acc[curr.season]){
            acc[curr.season] = {};
        }
        if(!acc[curr.season][curr.winner]){
            acc[curr.season][curr.winner] = 0;
        }
        acc[curr.season][curr.winner]++;
        return acc;
    }, {})
}

let matchesRecord = matches_Won_Per_Team_Per_Year(match);

fs.writeFileSync(dataPath, JSON.stringify(matchesRecord, null, 2), "utf-8");

