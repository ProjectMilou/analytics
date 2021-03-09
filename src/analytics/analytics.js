/* This file should later on be transformed to an entry point for backtesting
    portfolio evaluation, optimization and analysing.
*/
const fs = require("fs");
const api = require("../api/alphaVantage");

let portfolio;

try {
    // Reads the file and saves it in a string.
    const jsonString = fs.readFileSync("./examples/Demo_Portfolio_1.json");
    // Converts the JSON String to a JavaScript object.
    portfolio = JSON.parse(jsonString);
} catch (err) {
    console.log(err);
    return;
}

if (portfolio) {
    // Implement backtesting...
    console.log(portfolio);

    // Step 1: Fetch data for all of the stocks that are bought for a given TIME PERIOD
    // Step 1.1: If we have a Database available try to get the data from there.
    // If the data that we are looking for doesn't exist there -> call api.

    // Step 2: Call the backtesting algorithm

    // Step 3: If no errors => return results
}
