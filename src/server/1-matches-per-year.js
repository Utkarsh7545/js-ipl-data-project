// 1: Number of matches played per year for all the years in IPL.

import match from "../data/matches.json" assert { type: "json" };
import fs from "fs";

const dataPath = "./src/public/output/matchesPerYear.json";

const matchesPerYear = (match) => {
    return match.reduce((totalMatchesPerYear, matches) => {
        if(matches.season !== null){
            if(!totalMatchesPerYear[matches.season]){
                totalMatchesPerYear[matches.season] = 1;
            }
            else{
                totalMatchesPerYear[matches.season]++;
            }
        }
        return totalMatchesPerYear;
    }, {});
}

let matchesRecord = matchesPerYear(match);

fs.writeFileSync(dataPath, JSON.stringify(matchesRecord, null, 2), "utf-8");

