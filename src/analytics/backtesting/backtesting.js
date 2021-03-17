// Just an example of how this file could look like

/*
stocksData = 
{
    "IBM": {
        "2021-03-08": {
            "1. open": "122.9900",
            "2. high": "126.8500",
            "3. low": "122.8800",
            "4. close": "124.8100",
            "5. volume": "7239191"
        }
    }, 
    "TSLA": {

    }
}

{
    "Tesla": "TSLA",
}


*/
const namesToSymbols = {
    Tesla: "TSLA",
    Bayer: "BAYRY",
    "BASF SE NA O.N.": "BAS"
};
// Step 1: Final Portfolio Balance
function finalPortfolioBalance(portfolio, stocksData) { }

// Step 2: Max Drawdown
/*
    A maximum drawdown (MDD) is the maximum observed loss from a peak to a trough of a portfolio,
    before a new peak is attained. Maximum drawdown is an indicator of downside risk over a specified
    time period.

    Maximum Drawdown =  Minimimum Value - Maximum Value  / Maximum Value


*/

function maxDrawdown(portfolio, stocksData) { }

// Step 3: Standard Deviation and Sharpe Ratio
function standardDeviation(portfolio, stocksData) {
    const usedDates = Object.keys(stocksData[namesToSymbols[portfolio.securities[0].name]]);
    const numDays = usedDates.length;

    let valueEachDay = [];
    let lastValues = {};

    portfolio.securities.forEach((stock) => {
        lastValues[stock.name] = 0;
    });

    let sums = {};
    for (i = numDays - 1; i >= 0; i--) {
        let sum = 0;
        portfolio.securities.forEach((stock) => {
            if (usedDates[i] in stocksData[namesToSymbols[stock.name]]) {
                lastValues[stock.name] = stocksData[namesToSymbols[stock.name]][usedDates[i]]["4. close"] * stock.quantityNominal;
            }
            sum += lastValues[stock.name];
        });
        sums[i] = sum;
        if (i < numDays - 1) {
            valueEachDay.push(sums[(i + 1)] / sum - 1);
        }
    }
    const stats = require("stats-lite");
    const standardDeviation = stats.stdev(valueEachDay);
    //standard deviation in euro
    console.log(standardDeviation);

}

function sharpeRatio(portfolio, stocksData) { }

// Step 4: CompoundAnnualGrowthRate
function compoundAnnualGrowthRate(portfolio, stocksData) {
    //checks if the date is available in all stocks
    const usedDates = getDaysAvailableInAll(portfolio, stocksData);
    const startDate = usedDates[usedDates.length - 1];
    const endDate = usedDates[0];
    let startValue = 0;
    let endValue = 0;

    portfolio.securities.forEach((stock) => {
        startValue += stocksData[namesToSymbols[stock.name]][startDate]["4. close"] * stock.quantityNominal;
        endValue += stocksData[namesToSymbols[stock.name]][endDate]["4. close"] * stock.quantityNominal;
    });

    const yearDif = (new Date(endDate) - new Date(startDate)) / 1000 / 60 / 60 / 24 / 365;
    return CAGR = (endValue / startValue) ** (1 / yearDif) - 1;
}


function stockCorrelationAndStandardDeviation(portfolio, stocksData) {

    const calculateCorrelation = require("calculate-correlation");
    const stats = require("stats-lite");
    //may need to find starting date and combine all dates
    //need to use dailyinfo
    //either only use data available in all or use last updated value
    const usedDates = getDaysAvailableInAll(portfolio, stocksData)//Object.keys(stocksData[namesToSymbols[portfolio.securities[0].name]]);
    const numDays = usedDates.length;
    let valuesOfStock = {};
    let correlations = {};

    //put allvalues for each stock in an array 
    portfolio.securities.forEach((stock) => {
        let lastValue = 0;
        valuesOfStock[stock.name] = [];
        for (i = numDays - 2; i >= 0; i--) {
            if (usedDates[i] in stocksData[namesToSymbols[stock.name]] && usedDates[i + 1] in stocksData[namesToSymbols[stock.name]]) {
                //return in period
                lastValue = (Number(stocksData[namesToSymbols[stock.name]][usedDates[i]]["4. close"]) / Number(stocksData[namesToSymbols[stock.name]][usedDates[i + 1]]["4. close"])) - 1;

            }
            valuesOfStock[stock.name].push(lastValue);
        }

    });
    //calculate correlation
    for (stock1 of portfolio.securities) {
        for (stock2 of portfolio.securities) {
            if (stock1 == stock2) { break; }
            const correlationKey = getCorrelationKey(stock1, stock2);
            if (correlationKey in correlations) { break; }
            else {
                correlations[correlationKey] = calculateCorrelation(valuesOfStock[stock1.name], valuesOfStock[stock2.name]);
            }
        }
    }

    let standardDeviation = {};
    portfolio.securities.forEach((stock) => {
        standardDeviation[stock.name] = stats.stdev(valuesOfStock[stock.name]);

    });

    console.log(standardDeviation);
    console.log(correlations);

}

function getDaysAvailableInAll(portfolio, stocksData) {
    let usedDates = Object.keys(stocksData[namesToSymbols[portfolio.securities[0].name]]);
    usedDates.forEach((date) => {
        let dateInAll = true;
        portfolio.securities.forEach((stock) => {
            if (!(date in stocksData[namesToSymbols[stock.name]])) {
                dateInAll = false;
            }
        });
        if (!dateInAll) {
            const index = usedDates.indexOf(date);
            if (index > -1) {
                usedDates.splice(index, 1);
            }
        }
    });
    return usedDates;
}

function getCorrelationKey(stock1, stock2) {
    if (stock1.name < stock2.name) return stock1.name + "to" + stock2.name;
    else return stock2.name + " to " + stock1.name;
}

// Step 5: Performance in Best and Worst Year
function performanceBestYear(portfolio, stocksData) { }

function performanceWorstYear(portfolio, stocksData) { }

exports.finalPortfolioBalance = finalPortfolioBalance;
exports.maxDrawdown = maxDrawdown;
exports.standardDeviation = standardDeviation;
exports.sharpeRatio = sharpeRatio;
exports.performanceBestYear = performanceBestYear;
exports.performanceWorstYear = performanceWorstYear;
exports.compoundAnnualGrowthRate = compoundAnnualGrowthRate;
exports.stockCorrelationAndStandardDeviation = stockCorrelationAndStandardDeviation;
