// 7: Find the strike rate of a batsman for each season

import match from "../data/matches.json" assert { type: "json" };
import delivery from "../data/deliveries.json" assert { type: "json" };
import fs from "fs";

const dataPath = "./src/public/output/strikeRateOfABatsman.json";

const strike_Rate_Of_A_Batsman = (match, delivery) => {
    const result = {};
    const matchId_Season = {};

    for(let value of match){
        matchId_Season[value.id] = value.season;
    }

    for(let value of delivery){
        const batsman = value.batsman;
        const runs = parseInt(value.batsman_runs);
        const balls = 1;
        const season = matchId_Season[value.match_id];

        if(season){
            if(!result[season]){
                result[season] = {};
            }
            if(!result[season][batsman]){
                result[season][batsman] = {"runs" : 0, "balls" : 0};
            }
            result[season][batsman].runs += runs;
            result[season][batsman].balls++;
        }
    }

    const strikeRates = {};

    for(let season in result){
        strikeRates[season] = {};
        for(let batsman in result[season]){
            const runs = result[season][batsman].runs;
            const balls = result[season][batsman].balls;
            const strikeRate = (runs / balls) * 100;
            strikeRates[season][batsman] = strikeRate.toFixed(2);
        }
    }
    return strikeRates;
}

let matchesRecord = strike_Rate_Of_A_Batsman(match, delivery);

fs.writeFileSync(dataPath, JSON.stringify(matchesRecord, null, 2), "utf-8");

