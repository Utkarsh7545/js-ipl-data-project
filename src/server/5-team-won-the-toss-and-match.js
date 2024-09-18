// 5: Find the number of times each team won the toss and also won the match

import match from "../data/matches.json" assert { type: "json" };
import fs from "fs";

const dataPath = "./src/public/output/teamWonTheTossAndMatch.json";

const team_Won_The_Toss_And_Match = (match) => {
    return match.reduce((acc, curr) => {
        if(curr.toss_winner === curr.winner){
            if(!acc[curr.winner]){
                acc[curr.winner] = 0;
            }
            acc[curr.winner]++;
        }
        return acc;
    }, {});
}

let matchesRecord = team_Won_The_Toss_And_Match(match);

fs.writeFileSync(dataPath, JSON.stringify(matchesRecord, null, 2), "utf-8");

