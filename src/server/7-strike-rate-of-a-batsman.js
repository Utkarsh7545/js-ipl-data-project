// 7: Find the strike rate of a batsman for each season

import match from "../data/matches.json" assert { type: "json" };
import delivery from "../data/deliveries.json" assert { type: "json" };
import fs from "fs";

const dataPath = "./src/public/output/strikeRateOfABatsman.json";

const strike_Rate_Of_A_Batsman = (match, delivery) => {
    const ids = match.reduce((acc , curr) => {
        acc[curr.id] = curr.season;
        return acc;
    }, {});

    const result = delivery.reduce((acc, curr) => {
        const year = ids[curr.match_id];
        const batsman = curr.batsman;

        if(!acc[year]){
            acc[year] = {};
        }
        if(!acc[year][batsman]){
            acc[year][batsman] = {"runs" : 0, "balls" : 0};
        }
        acc[year][batsman].runs += parseInt(curr.batsman_runs);
        if(curr.wide_runs === "0" && curr.noball_runs === "0"){
            acc[year][batsman].balls++;
        }
        return acc;
    }, {});

    return Object.entries(result)
    .reduce((acc, [year, players]) => {
        acc[year] = Object.entries(players).reduce((strikeRates, [player, stats]) => {
            const run = stats.runs;
            const ball = stats.balls;
            const strikeRate = (run / ball) * 100;

            strikeRates[player] = strikeRate.toFixed(2);
            return strikeRates;
        }, {});
        return acc;
    }, {});
}

let matchesRecord = strike_Rate_Of_A_Batsman(match, delivery);

fs.writeFileSync(dataPath, JSON.stringify(matchesRecord, null, 2), "utf-8");

