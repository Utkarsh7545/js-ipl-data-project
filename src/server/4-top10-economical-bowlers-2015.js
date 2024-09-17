// 4: Top 10 economical bowlers in the year 2015

import match from "../data/matches.json" assert { type: "json" };
import delivery from "../data/deliveries.json" assert { type: "json" };
import fs from "fs";

const dataPath = "./src/public/output/top10EconomicalBowlers2015.json";

const top10_Economical_Bowlers_2015 = (match, delivery) => {
    const result = {};
    const matchId = [];

    for(let value of match){
        if(value.season === "2015"){
            matchId.push(value.id);
        }
    }
    
    for(let value of delivery){
        if(matchId.includes(value.match_id)){
            if(!result[value.bowler]){
                result[value.bowler] = {"runsConceded" : 0, "ballsBowled" : 0};
            }
            result[value.bowler].runsConceded += parseInt(value.total_runs);
            if(value.wide_runs === "0" && value.noball_runs === "0"){
                result[value.bowler].ballsBowled++;
            }
        }
    }

    const bowlerEconomy = [];

    for(let value in result){
        const runs = result[value].runsConceded;
        const overs = result[value].ballsBowled / 6;
        const economy = (runs / overs).toFixed(2);
        
        bowlerEconomy.push({"Bowler" : value, "Economy" : economy});
    }
    
    bowlerEconomy.sort((a,b) => a.Economy - b.Economy);
    const top10 = bowlerEconomy.slice(0, 10);
    
    return top10;
}

let matchesRecord = top10_Economical_Bowlers_2015(match, delivery);

fs.writeFileSync(dataPath, JSON.stringify(matchesRecord, null, 2), "utf-8");

