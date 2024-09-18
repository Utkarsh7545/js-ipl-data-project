// 6: Find a player who has won the highest number of Player of the Match awards for each season

import match from "../data/matches.json" assert { type: "json" };
import fs from "fs";

const dataPath = "./src/public/output/highestPlayerOfTheMatch.json";

const highest_Player_Of_The_Match = (match) => {
    const result = match.reduce((acc, curr) => {
        if(!acc[curr.season]){
            acc[curr.season] = {};
        }
        if(!acc[curr.season][curr.player_of_match]){
            acc[curr.season][curr.player_of_match] = 0;
        }
        acc[curr.season][curr.player_of_match]++;
        return acc;
    }, {})
    
    return Object.entries(result)
    .reduce((acc, [key, value]) => {
        const x = Object.entries(value)
        .reduce((acc1, [key1, value1]) => {
            
            if(value1 > acc1.awards){
                acc1.awards = value1;
                acc1.player = key1;
            }
            return acc1;
        }, {player : "", awards : 0});

        acc[key] = x;
        return acc;
    }, {});
}

let matchesRecord = highest_Player_Of_The_Match(match);

fs.writeFileSync(dataPath, JSON.stringify(matchesRecord, null, 2), "utf-8");

