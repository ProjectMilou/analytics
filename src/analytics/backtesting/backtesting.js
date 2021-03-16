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

    for (i = 0; i < numDays; i++) {
        let sum = 0;
        portfolio.securities.forEach((stock) => {
            if (usedDates[i] in stocksData[namesToSymbols[stock.name]]) {
                lastValues[stock.name] = Number(stocksData[namesToSymbols[stock.name]][usedDates[i]]["4. close"]);
            }
            sum += lastValues[stock.name];
        });
        valueEachDay.push(sum);
    }

    const stats = require("stats-lite");
    const standardDeviation = stats.stdev(valueEachDay);
    //standard deviation in euro
    console.log(standardDeviation);
}

function sharpeRatio(portfolio, stocksData) { }

// Step 4: CompoundAnnualGrowthRate
function compoundAnnualGrowthRate(portfolio, stocksData) {

    const firstSecurityStockData = stocksData[namesToSymbols[portfolio.securities[0].name]];
    const firstSecurityDates = Object.keys(firstSecurityStockData);

    let datePos = firstSecurityDates.length - 1;
    let startDate = firstSecurityDates[datePos];
    let dateInAll = false;
    //checks if the date is available in all stocks
    while (!dateInAll) {
        dateInAll = true;
        startDate = firstSecurityDates[datePos--];//datePos will be one lower than the actual po if the while stops
        portfolio.securities.forEach((stock) => {
            if (!(startDate in stocksData[namesToSymbols[stock.name]])) {
                dateInAll = false;
            }
        });
        if (datePos == 0) throw "stocksData is not usable";
    };

    const endDate = firstSecurityDates[0];
    let startValue = 0;
    let endValue = 0;

    portfolio.securities.forEach((stock) => {
        startValue += stocksData[namesToSymbols[stock.name]][startDate]["4. close"] * stock.quantityNominal;
        endValue += stocksData[namesToSymbols[stock.name]][endDate]["4. close"] * stock.quantityNominal;
    });

    const yearDif = (new Date(endDate) - new Date(startDate)) / 1000 / 60 / 60 / 24 / 365;
    return CAGR = (endValue / startValue) ** (1 / yearDif) - 1;
}

function stockCorrelation(portfolio, stocksData) {

    const calculateCorrelation = require("calculate-correlation");
    const stats = require("stats-lite");
    //may need to find starting date and combine all dates
    //need to use dailyinfo
    //only use dates available in all
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

    const numDays = usedDates.length;
    let valuesOfStock = {};
    let correlations = {};

    //put allvalues for each stock in an array 
    portfolio.securities.forEach((stock) => {
        let lastValue = 0;
        valuesOfStock[stock.name] = [];
        for (i = 0; i < numDays; i++) {
            if (usedDates[i] in stocksData[namesToSymbols[stock.name]]) {
                lastValue = Number(stocksData[namesToSymbols[stock.name]][usedDates[i]]["4. close"]);
                valuesOfStock[stock.name].push(lastValue);
            }

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
    //console.log(valuesOfStock);
    console.log(correlations);


}


function getCorrelationKey(stock1, stock2) {
    if (stock1.name < stock2.name) return stock1.name + "to" + stock2.name;
    else return stock2.name + "to" + stock1.name;
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
exports.stockCorrelation = stockCorrelation;
