const fs = require("fs");
const api = require("./api/alphaVantage");
const analytics = require("./analytics/analytics");
const diversification = require("./analytics/javascript-analysis/diversification");
const priceEarningRatio = require("./analytics/javascript-analysis/PriceEarningRatio");
const dividendYield = require("./analytics/javascript-analysis/Dividendyield");
const stockStandardDeviationAndCorrelation = require("./analytics/javascript-analysis/stockStandardDeviationAndCorrelation");
const gainLoss = require("./analytics/javascript-analysis/gainLoss")
const debtEquity = require("./analytics/javascript-analysis/debt-equity")
const { namesToSymbols } = require("./static/names-symbols-mapping")
const portfolioOptimization = require("./analytics/javascript-analysis/PortfolioOptimization");

// Can be compared like fromDate < toDate or fromDate > toDate
// Equality can be compared like fromDate.getTime() === toDate.getTime()
const fromDate = new Date("2017-01-01");
const toDate = new Date();


// Used Google and Symbol Search from AlphaVantageAPI
// Used for mapping Names to Symbols in extractSymbolsFromPortfolio()

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

let stocksData = readSymbolDataAndFilterByDates(symbolsDivers);
let symbolCompanyOverview = readCompanyOverviewsBySymbols(symbolsDivers);
const balanceSheetPerSymbol = readBalanceSheetsBySymbols(symbolsDivers);

console.log("\n**************************\n      BACKTESTING\n")

console.log(`From: ${fromDate.toLocaleDateString()} To: ${toDate.toLocaleDateString()} \n`)

const backtestResult = analytics.backtest(portfolioDivers, stocksData)
console.log({
    fromDate,
    toDate,
    ...backtestResult
});

console.log("\n**************************\n      DIVERSIFICATION\n")

const resultFromDiversification = diversification.getDiversification(portfolioDivers, symbolCompanyOverview);
console.log(resultFromDiversification)


console.log("\n**************************\n      PERatios\n")

const resultFromPriceEarningRatio = priceEarningRatio.getPriceEarningRatio(portfolioDivers, symbolCompanyOverview);
console.log(resultFromPriceEarningRatio);


console.log("\n**************************\n      DIVIDENDYIELDS\n")

const resultFromDividendyield = dividendYield.getDividendyield(portfolioDivers, symbolCompanyOverview);
console.log(resultFromDividendyield);


console.log("\n**************************\n      GAIN/LOSS\n")


const gainOrLoss = gainLoss.gainOrLossLastYearOrMonth(portfolioDivers, stocksData)
console.log(gainOrLoss)


console.log("\n**************************\n VOLATILITY, STANDARD DEVIATION\n    CORRELATION\n")

const annualizedVolatilityAndCorrelation = stockStandardDeviationAndCorrelation.standardDeviationAndCorrelation(portfolioDivers, stocksData);
console.log(annualizedVolatilityAndCorrelation)


console.log("\n**************************\n      SHARPE RATIO \n")

const sharpeRatio = stockStandardDeviationAndCorrelation.sharpeRatioStocks(portfolioDivers, stocksData);
console.log(sharpeRatio);


console.log("\n**************************\n      DEBT/EQUITY\n")

const debtEquityResults = debtEquity.debtEquity(portfolioDivers, balanceSheetPerSymbol);
console.log(debtEquityResults);


console.log("\n**************************\n      PORTFOLIO OPTIMIZATION\n");
const portfolioOptimizationResult = portfolioOptimization.getPortfolioOptimization(portfolioDivers, stocksData);
console.log(portfolioOptimizationResult);
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

function readBalanceSheetsBySymbols(symbols) {
    let balanceSheetPerSymbol = {}
    try {
        symbols.forEach(symbol => {
            const jsonString = fs.readFileSync(
                `./data/balanceSheet/${symbol}.json`
            );
            const balanceSheet = JSON.parse(jsonString);
            balanceSheetPerSymbol[symbol] = balanceSheet;
        })
    } catch (err) {
        console.log(err)
    }
    return balanceSheetPerSymbol;
};