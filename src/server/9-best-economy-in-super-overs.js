// 9: Find the bowler with the best economy in super overs

import delivery from "../data/deliveries.json" assert { type: "json" };
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataPath = join(__dirname, "../public/output/bestEconomyInSuperOvers.json");

const best_Economy_In_Super_Overs = (delivery) => {
    const result = {};

    for(let value of delivery){
        const bowler = value.bowler;
        const runs = parseInt(value.batsman_runs) + parseInt(value.wide_runs) + parseInt(value.noball_runs);
        const superOver = value.is_super_over;

        if(superOver !== "0"){
            if(!result[bowler]){
                result[bowler] = {"Runs" : 0, "Balls" : 0};
            }
            result[bowler].Runs += runs;
            result[bowler].Balls++;
        }
    }

    let finalResult = {"Bowler" : "", "Economy" : Infinity};

    for(let bowler in result){
        const runs = result[bowler].Runs;
        const overs = result[bowler].Balls / 6;
        const economy = runs / overs;

        if(finalResult.Economy > economy){
            finalResult.Economy = economy.toFixed(2);
            finalResult.Bowler = bowler;
        }
    }
    return finalResult;
    
}

let matchesRecord = best_Economy_In_Super_Overs(delivery);

fs.writeFileSync(dataPath, JSON.stringify(matchesRecord, null, 2), "utf-8");

