import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

// Mimic __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to convert CSV to JSON
function csvToJson(csv) {
  const lines = csv.split("\n");
  const result = [];
  const headers = lines[0].split(",");

  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentLine = lines[i].split(",");
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j].trim()] = currentLine[j] ? currentLine[j].trim() : null;
    }
    result.push(obj);
  }
  return JSON.stringify(result, null, 4);
}

// Function to read CSV file and write JSON file
function convertCsvToJsonFile(csvFilePath, jsonFilePath) {
  fs.readFile(csvFilePath, "utf8", (err, csvData) => {
    if (err) {
      console.error("Error reading the CSV file:", err);
      return;
    }

    const jsonData = csvToJson(csvData);

    fs.writeFile(jsonFilePath, jsonData, (err) => {
      if (err) {
        console.error("Error writing the JSON file:", err);
        return;
      }
      console.log(`JSON file has been saved to ${jsonFilePath}`);
    });
  });
}

const matchesPath = join(__dirname, "./data/matches.csv"); // Path to the  Matches CSV file
const deliveriesPath = join(__dirname, "./data/deliveries.csv"); // Path to the Deliveries CSV file

const matchesJsonFilePath = join(__dirname, "./data/matches.json"); // Path to the output Matches JSON file
const deliveriesJsonFilePath = join(__dirname, "./data/deliveries.json"); // Path to the output Deliveries JSON file

convertCsvToJsonFile(matchesPath, matchesJsonFilePath);
convertCsvToJsonFile(deliveriesPath, deliveriesJsonFilePath);

