// 8: Find the highest number of times one player has been dismissed by another player

import delivery from "../data/deliveries.json" assert { type: "json" };
import fs from "fs";

const dataPath = "./src/public/output/highestDismissalsByBowler.json";

const highest_Dismissals_By_Bowler = (delivery) => {
    const result = {};

    for(let value of delivery){
        const batsman = value.batsman;
        const bowler = value.bowler;
        const dismissals = value.dismissal_kind;

        if(dismissals && dismissals !== "run out"){
            if(!result[batsman]){
                result[batsman] = {};
            }
            if(!result[batsman][bowler]){
                result[batsman][bowler] = 0;
            }
            result[batsman][bowler]++;
        }
    }
    
    let finalResult = {"Batsman" : "", "Bowler" : "", "Dismissals" : 0};

    for(let batsman in result){
        for(let bowler in result[batsman]){
            if(result[batsman][bowler] > finalResult.Dismissals){
                finalResult.Batsman = batsman;
                finalResult.Bowler = bowler;
                finalResult.Dismissals = result[batsman][bowler];
            }
        }
    }
    return finalResult;
}

let matchesRecord = highest_Dismissals_By_Bowler(delivery);

fs.writeFileSync(dataPath, JSON.stringify(matchesRecord, null, 2), "utf-8");

