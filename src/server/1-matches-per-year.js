// 1: Number of matches played per year for all the years in IPL.

import match from "../data/matches.json" assert { type: "json" };
import fs from "fs";

const dataPath = "./src/public/output/matchesPerYear.json";

const matches_Per_Year = (data) => {
    const result = {};

    data.forEach(element => {
        if(element.season !== null){
            if(!result.hasOwnProperty(element.season)){
                result[element.season] = 1;
            }
            else{
                result[element.season]++;
            }
        }
    })
    return result;
}

let matchesRecord = matches_Per_Year(match);

fs.writeFileSync(dataPath, JSON.stringify(matchesRecord, null, 2), "utf-8");

