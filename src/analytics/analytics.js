/* This file should later on be transformed to an entry point for backtesting
    portfolio evaluation, optimization and analysing.
*/
const fs = require("fs");
const api = require("../api/alphaVantage");
const backtesting = require("./backtesting/backtesting");

// Can be compared like fromDate < toDate or fromDate > toDate
// Equality can be compared like fromDate.getTime() === toDate.getTime()
const fromDate = new Date("2015-01-01");
const toDate = new Date("2020-12-31");

// Used Google and Symbol Search from AlphaVantageAPI
// Used for mapping Names to Symbols in extractSymbolsFromPortfolio()
const namesToSymbols = {
    Tesla: "TSLA",
    Bayer: "BAYRY",
    "BASF SE NA O.N.": "BAS"
};

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
    const symbols = extractSymbolsFromPortfolio(portfolio);

    // Step 1: Fetch data for all of the stocks that are bought for a given TIME PERIOD
    // Step 1.1: If we have a Database available try to get the data from there.
    // If the data that we are looking for doesn't exist there -> call api.

    //fetchStocksForPortfolio(portfolio, symbols);

    let stocksData = {};
    try {
        symbols.forEach((symbol) => {
            const jsonString = fs.readFileSync(
                `./symbolMonthlyData/${symbol}.json`
            );
            const dataForSymbol = JSON.parse(jsonString);
            const weeklyData = dataForSymbol["Monthly Time Series"];
            let filteredData = {};

            // Filter by the fromDate and endDate
            for (const [key, value] of Object.entries(weeklyData)) {
                // Create a date from the key of the object
                // The key would be something like : "2021-03-08". Check time_series_weekly.json
                const currentDate = new Date(key);

                // Check whether the current date is between the given From- and
                // ToDate or whether it is exactly on the same day
                if (currentDate >= fromDate && currentDate <= toDate) {
                    // add the data to a local variable

                    filteredData[key] = value;
                }
            }

            stocksData[symbol] = filteredData;

        });
    } catch (err) {
        console.log(err);
    }


    // Step 2: Call the backtesting algorithm

    //backtesting.maxDrawdown(portfolio, stocksData);
    console.log(backtesting.compoundAnnualGrowthRate(portfolio, stocksData));
    backtesting.stockCorrelationAndStandardDeviation(portfolio, stocksData);
    backtesting.standardDeviation(portfolio, stocksData);
    // Step 3: If no errors => return results
}

function fetchStocksForSymbols(symbols) {
    // const dataForSymbols = {};

    symbols.forEach((symbol) => {
        api.getTimeSeriesWeekly(symbol)
            .then((data) => {
                fs.writeFileSync(
                    `./symbolWeeklyData/${symbol}.json`,
                    JSON.stringify(data)
                );

                // Probably before saving the data in an object we can filter it by the dates
                // dataForSymbols[symbol] = data;
            })
            .catch((err) => {
                console.log(err);
            });
    });
}

function extractSymbolsFromPortfolio(portfolio) {
    const symbols = [];
    portfolio.securities.forEach((element) => {
        symbols.push(namesToSymbols[element.name]);
    });
    return symbols;
}
