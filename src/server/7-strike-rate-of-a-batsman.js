// 7: Find the strike rate of a batsman for each season

import match from "../data/matches.json" assert { type: "json" };
import delivery from "../data/deliveries.json" assert { type: "json" };
import fs from "fs";

const dataPath = "./src/public/output/strikeRateOfABatsman.json";

const strikeRateOfABatsman = (match, delivery) => {
    const ids = match.reduce((matchId , matches) => {
        matchId[matches.id] = matches.season;
        return matchId;
    }, {});

    const batsmanScore = delivery.reduce((yearAndPlayer, matches) => {
        const year = ids[matches.match_id];
        const batsman = matches.batsman;

        if(!yearAndPlayer[year]){
            yearAndPlayer[year] = {};
        }
        if(!yearAndPlayer[year][batsman]){
            yearAndPlayer[year][batsman] = {"runs" : 0, "balls" : 0};
        }
        yearAndPlayer[year][batsman].runs += parseInt(matches.batsman_runs);
        if(matches.wide_runs === "0" && matches.noball_runs === "0"){
            yearAndPlayer[year][batsman].balls++;
        }
        return yearAndPlayer;
    }, {});

    return Object.entries(batsmanScore)
    .reduce((strikeRateOfBatsman, [year, players]) => {
        strikeRateOfBatsman[year] = Object.entries(players).reduce((strikeRates, [player, stats]) => {
            const run = stats.runs;
            const ball = stats.balls;
            const strikeRate = (run / ball) * 100;

            strikeRates[player] = strikeRate.toFixed(2);
            return strikeRates;
        }, {});
        return strikeRateOfBatsman;
    }, {});
}

let matchesRecord = strikeRateOfABatsman(match, delivery);

fs.writeFileSync(dataPath, JSON.stringify(matchesRecord, null, 2), "utf-8");

