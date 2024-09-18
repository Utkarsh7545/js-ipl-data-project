// 1: Number of matches played per year for all the years in IPL.

import match from "../data/matches.json" assert { type: "json" };
import fs from "fs";

const dataPath = "./src/public/output/matchesPerYear.json";

const matches_Per_Year = (data) => {
    return data.reduce((acc, curr) => {
        if(curr.season !== null){
            if(!acc[curr.season]){
                acc[curr.season] = 1;
            }
            else{
                acc[curr.season]++;
            }
        }
        return acc;
    }, {});
}

let matchesRecord = matches_Per_Year(match);

fs.writeFileSync(dataPath, JSON.stringify(matchesRecord, null, 2), "utf-8");

