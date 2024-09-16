// 1: Number of matches played per year for all the years in IPL.

import match from "../data/matches.json" assert { type: "json" };
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataPath = join(__dirname, "../public/output/matchesPerYear.json");

const matches_Per_Year = (data) => {
    const result = {};

    for(let i=0; i<data.length; i++){
        if (data[i].season !== null) {
            if(result[data[i].season]){
                result[data[i].season]++;
            }
            else{
                result[data[i].season] = 1;
            }
        }
    }
    return result;
}

let matchesRecord = matches_Per_Year(match);

fs.writeFileSync(dataPath, JSON.stringify(matchesRecord, null, 2), "utf-8");

