// 6: Find a player who has won the highest number of Player of the Match awards for each season

import match from "../data/matches.json" assert { type: "json" };
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataPath = join(__dirname, "../public/output/highestPlayerOfTheMatch.json");

const highest_Player_Of_The_Match = (match) => {
    const result = {};
    
    for(let value of match){
        if(value.season){
            if(!result[value.season]){
                result[value.season] = {};
            }
            if(!result[value.season][value.player_of_match]){
                result[value.season][value.player_of_match] = 0;
            }
            result[value.season][value.player_of_match]++;
        }
    }

    const finalResult = {};
    for(let value in result){
        let max = 0;
        let player = "";
        for(let players in result[value]){
            if(result[value][players] > max){
                max = result[value][players];
                player = players;
            }
        }
        finalResult[value] = { [player] : max } ;
    }
    return finalResult;
}

let matchesRecord = highest_Player_Of_The_Match(match);

fs.writeFileSync(dataPath, JSON.stringify(matchesRecord, null, 2), "utf-8");

