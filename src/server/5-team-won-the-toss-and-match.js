// 5: Find the number of times each team won the toss and also won the match

import match from "../data/matches.json" assert { type: "json" };
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataPath = join(__dirname, "../public/output/teamWonTheTossAndMatch.json");

const team_Won_The_Toss_And_Match = (match) => {
    const result = {};
    
    for(let value of match){
        if(value.toss_winner && value.winner && (value.toss_winner === value.winner)){
            if(!result[value.winner]){
                result[value.winner] = 0;
            }    
            result[value.winner]++;
        }
    }
    return result;
}

let matchesRecord = team_Won_The_Toss_And_Match(match);

fs.writeFileSync(dataPath, JSON.stringify(matchesRecord, null, 2), "utf-8");
