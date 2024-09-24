// 5: Find the number of times each team won the toss and also won the match

import match from "../data/matches.json" assert { type: "json" };
import fs from "fs";

const dataPath = "./src/public/output/teamWonTheTossAndMatch.json";

const teamWonTheTossAndMatch = (match) => {
    return match.reduce((teamWonTossAndMatch, team) => {
        if(team.toss_winner === team.winner){
            if(!teamWonTossAndMatch[team.winner]){
                teamWonTossAndMatch[team.winner] = 0;
            }
            teamWonTossAndMatch[team.winner]++;
        }
        return teamWonTossAndMatch;
    }, {});
}

let matchesRecord = teamWonTheTossAndMatch(match);

fs.writeFileSync(dataPath, JSON.stringify(matchesRecord, null, 2), "utf-8");

