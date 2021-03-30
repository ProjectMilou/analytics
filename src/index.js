const fs = require("fs");
const api = require("./api/alphaVantage");
const analytics = require("./analytics/analytics");
const diversification = require("./analytics/javascript-analysis/diversification");
const stockStandardDeviationAndCorrelation = require("./analytics/javascript-analysis/stockStandardDeviationAndCorrelation");
const gainLoss = require("./analytics/javascript-analysis/gainLoss")
const priceEarningRatio = require("./analytics/javascript-analysis/PriceEarningRation")
const dividendYield = require("./analytics/javascript-analysis/Dividendyield")


// Can be compared like fromDate < toDate or fromDate > toDate
// Equality can be compared like fromDate.getTime() === toDate.getTime()
const fromDate = new Date("2017-01-01");
const toDate = new Date("2020-01-01");


// Used Google and Symbol Search from AlphaVantageAPI
// Used for mapping Names to Symbols in extractSymbolsFromPortfolio()
const namesToSymbols = {
    Tesla: "TSLA",
    Bayer: "BAYRY",
    "BASF SE NA O.N.": "BAS",
    Apple: "AAPL",
    Amazon: "AMZN",
    Google: "GOOGL",
    IBM: "IBM",
    "Alibaba group": "BABA",
    "JPMorgan Chase & Co.": "JPM"
};


let portfolio = readPortfolio("Demo_Portfolio_1.json")
let portfolioDivers = readPortfolio("Demo_Portfolio_2.json")

if (!portfolio || !portfolioDivers) {
    console.log("Could not read portfolio")
}


const symbols = extractSymbolsFromPortfolio(portfolio);
const symbolsDivers = extractSymbolsFromPortfolio(portfolioDivers);

// Step 1: Fetch data for all of the stocks that are bought for a given TIME PERIOD
// Step 1.1: If we have a Database available try to get the data from there.
// If the data that we are looking for doesn't exist there -> call api.

//fetchStocksForSymbols(symbolsDivers);

let stocksData = readSymbolDataAndFilterByDates(symbols);
let symbolCompanyOverview = readCompanyOverviewsBySymbols(symbolsDivers);

const backtestResult = analytics.backtest(portfolio, stocksData)
console.log(backtestResult);

const resultFromDiversification = diversification.getDiversification(portfolioDivers, symbolCompanyOverview);
console.log(resultFromDiversification)
const resultFromPriceEarningRatio = priceEarningRatio.getPriceEarningRation(portfolioDivers, symbolCompanyOverview);
console.log(resultFromPriceEarningRatio);

const resultFromDividendyield = dividendYield.getDividendyield(portfolioDivers, symbolCompanyOverview);
console.log(resultFromDividendyield);
const gainOrLoss = gainLoss.gainOrLossLastYearOrMonth(portfolio, stocksData)
console.log(gainOrLoss)

console.log(stockStandardDeviationAndCorrelation.sharpeRatioStocks(portfolio, stocksData));

// HELPER FUNCTIONS :)

function fetchStocksForSymbols(symbols) {
    // const dataForSymbols = {};

    symbols.forEach((symbol) => {
        api.getCompanyOverview(symbol)
            .then((data) => {
                fs.writeFileSync(
                    `./data/companyOverview/${symbol}.json`,
                    JSON.stringify(data)
                );

                // Probably before saving the data in an object we can filter it by the dates
                // dataForSymbols[symbol] = data;
            })
            .catch((err) => {
                console.log(err);
            });
        console.log(`Data for ${symbol}.json was written successfully\n`)
    });
}

function extractSymbolsFromPortfolio(portfolio) {
    const symbols = [];
    portfolio.securities.forEach((element) => {
        symbols.push(namesToSymbols[element.name]);
    });
    return symbols;
}

function inputRiskFreeInterest() {
    //create RiskFreeInterestJson

    // Reads the file and saves it in a string.
    const string = fs.readFileSync(
        "C:/Users/waiho/Milou/analytics/RiskFreeInterest/TreasuryBond.csv",
        "utf8"
    );
    const lines = string.split("\n");
    let datesInterest = {};
    for (var i = 1; i < lines.length; i++) {
        let currentLine = lines[i].split(",");
        datesInterest[currentLine[0]] = Number(currentLine[1]);
    }
    fs.writeFile(
        "./data/RiskFreeInterest/Rates.json",
        JSON.stringify(datesInterest, null, 2),
        (err) => {
            if (err) console.log("Error writing file:", err);
        }
    );
}

function readPortfolio(portfolioName) {
    let portfolio = {};
    try {
        // Reads the file and saves it in a string.
        const jsonString = fs.readFileSync(`./data/examples/${portfolioName}`);
        // Converts the JSON String to a JavaScript object.
        portfolio = JSON.parse(jsonString);
    } catch (err) {
        console.log(err);
        return;
    }
    return portfolio;
}

function readSymbolDataAndFilterByDates(symbols) {
    let stocksData = {};
    try {
        symbols.forEach((symbol) => {
            const jsonString = fs.readFileSync(
                `./data/symbolWeeklyData/${symbol}.json`
            );
            const dataForSymbol = JSON.parse(jsonString);
            const weeklyData = dataForSymbol["Weekly Time Series"];
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

    return stocksData;
}

function readCompanyOverviewsBySymbols(symbols) {
    let symbolCompanyOverviews = {}
    try {
        symbols.forEach(symbol => {
            const jsonString = fs.readFileSync(
                `./data/companyOverview/${symbol}.json`
            );
            const companyOverview = JSON.parse(jsonString);
            symbolCompanyOverviews[symbol] = companyOverview;
        });
    } catch (err) {
        console.log(err)
    }
    return symbolCompanyOverviews;
}