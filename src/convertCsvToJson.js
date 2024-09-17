import csvtojson from "csvtojson";
import fs from "fs";

const matchesCsvFilePath = "./src/data/matches.csv";
const deliveriesCsvFilePath = "./src/data/deliveries.csv";
const matchesJsonFilePath = "./src/data/matches.json";
const deliveriesJsonFilePath = "./src/data/deliveries.json";

function convertCsvFileToJsonFile(csvFilePath, jsonFilePath){
  csvtojson()
  .fromFile(csvFilePath)
  .then((json) => {
    try{
      fs.writeFileSync(jsonFilePath, JSON.stringify(json, null, 2), "utf-8");
    }
    catch(error){
      console.log(error);
    }
  })
}

convertCsvFileToJsonFile(matchesCsvFilePath, matchesJsonFilePath);
convertCsvFileToJsonFile(deliveriesCsvFilePath, deliveriesJsonFilePath);

