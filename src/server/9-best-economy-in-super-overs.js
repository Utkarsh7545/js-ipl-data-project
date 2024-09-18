// 9: Find the bowler with the best economy in super overs

import delivery from "../data/deliveries.json" assert { type: "json" };
import fs from "fs";

const dataPath = "./src/public/output/bestEconomyInSuperOvers.json";

const best_Economy_In_Super_Overs = (delivery) => {
    const bowlers = delivery.reduce((bowlerDetails, score) => {
        const runs = parseInt(score.batsman_runs) + parseInt(score.wide_runs) + parseInt(score.noball_runs);
        const bowler = score.bowler;
        if(score.is_super_over !== "0"){
            if(!bowlerDetails[bowler]){
                bowlerDetails[bowler] = {"runs" : 0, "balls" : 0};
            }
            bowlerDetails[bowler].runs += runs;
            bowlerDetails[bowler].balls++;
        }
        return bowlerDetails;
    }, {});

    return Object.entries(bowlers)
    .reduce((score, [bowler, value]) => {
        const run = value.runs;
        const over = value.balls / 6;
        const economy = run / over;

        if(economy < score.Economy){
            score.Economy = economy.toFixed(2);
            score.Bowler = bowler;
        }
        return score;
    }, {"Bowler" : "", "Economy" : Infinity});
}

let matchesRecord = best_Economy_In_Super_Overs(delivery);

fs.writeFileSync(dataPath, JSON.stringify(matchesRecord, null, 2), "utf-8");

