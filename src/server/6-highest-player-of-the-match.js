// 6: Find a player who has won the highest number of Player of the Match awards for each season

import match from "../data/matches.json" assert { type: "json" };
import fs from "fs";

const dataPath = "./src/public/output/highestPlayerOfTheMatch.json";

const highestPlayerOfTheMatch = (match) => {

    const playerOfTheMatch = match.reduce((yearAndPlayer, matches) => {
        if(!yearAndPlayer[matches.season]){
            yearAndPlayer[matches.season] = {};
        }
        if(!yearAndPlayer[matches.season][matches.player_of_match]){
            yearAndPlayer[matches.season][matches.player_of_match] = 0;
        }
        yearAndPlayer[matches.season][matches.player_of_match]++;
        return yearAndPlayer;
    }, {})
    
    return Object.entries(playerOfTheMatch)
    .reduce((highestPlayerOfMatch, [year, playerAndAward]) => {
        const playerAndAwards = Object.entries(playerAndAward)
        .reduce((matches, [player, award]) => {
            
            if(award > matches.awards){
                matches.awards = award;
                matches.player = player;
            }
            return matches;
        }, {player : "", awards : 0});

        highestPlayerOfMatch[year] = playerAndAwards;
        return highestPlayerOfMatch;
    }, {});
}

let matchesRecord = highestPlayerOfTheMatch(match);

fs.writeFileSync(dataPath, JSON.stringify(matchesRecord, null, 2), "utf-8");

