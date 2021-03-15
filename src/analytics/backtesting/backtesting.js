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
    "BASF SE NA O.N.": "BAS.FRK"
};
// Step 1: Final Portfolio Balance
/*
It should return the finalPortfolioBalance for a given timespan
Core idea: iterates through all dates of all symbols of the two given years
and adds the difference between start and end portfolio value of each stock
Depending whaether the final sum is negative or positive returns sum or 0 

*/
function finalPortfolioBalance(portfolio, stocksData, startYear, endYear) {
    const [symbolToQuantity, symbols] = getSymbolsAndMappingToQuantity(
        portfolio
    );

    let years = getStocksDateAccordingToYears(stocksData);
    startYear = Object.keys(years)[0];
    endYear = Object.keys(years)[Object.keys(years).length - 1];
    let totalBalance = 0;

    symbols.forEach((symbol) => {
        for (let i = 0; i < symbol.length; i++) {
            //I assume the length of dates in the symbols is equal for both startYear and endYear
            console.log(symbol);
            let dateForStartSymbol = years[startYear][symbol][i];
            let dateForEndSymbol = years[endYear][symbol][i];

            startPortfolioValue =
                stocksData[symbol][dateForStartSymbol]["4. close"] *
                symbolToQuantity[symbol];
            endPortfolioValue =
                stocksData[symbol][dateForEndSymbol]["4. close"] *
                symbolToQuantity[symbol];
            totalBalance += startPortfolioValue - endPortfolioValue;
        }
    });
    if (totalBalance < 0) {
        return { totalBalance: 0 };
    }
    return {
        totalBalance
    };
}

//TODO: DISCUSS - Assumption that all the assets are bought in EUR;
/**
 * Returns the maximum drawdown of a portfolio.
 * Maximum Drawdown = Minimimum Value - Maximum Value  / Maximum Value
 * @param {object} portfolio Portfolio from finAPI
 * @param {{symbol: {date: {"1. open": "20.6350", "2. high": "71.7300", "3. low": "70.5200","4. close": "71.4900", "5. volume": "114923"}}}} stocksData Stocks data according to symbols
 * @returns {{MDD, dateMax, dateMin, maxValue, minValue}}
 * An object containing the MDD value, maximum and minimum value and the corresponding dates.
 */
function mdd(portfolio, stocksData) {
    const [symbolToQuantity, symbols] = getSymbolsAndMappingToQuantity(
        portfolio
    );
    let aggregatedMax = -9999999;
    let aggregatedMin = 9999999;
    let dateMax = "";
    let dateMin = "";

    const datesOfFirstSymbol = stocksData[symbols[0]];

    // Used for dealing with the different dates of different stocks :)
    // TODO: Discuss this part
    let lastPriceForSymbol = {};

    for (const date of Object.keys(datesOfFirstSymbol)) {
        let aggregatedSumOfAllStocks = 0;

        // For each of symbols calculate the amount of Stocks * price of stocks
        // Add the result to an aggregated sum of all stocks
        // Also ASSUMING that the value is given in EUR.
        symbols.forEach((symbol) => {
            if (date in stocksData[symbol]) {
                aggregatedSumOfAllStocks +=
                    stocksData[symbol][date]["4. close"] *
                    symbolToQuantity[symbol];
                lastPriceForSymbol[symbol] =
                    stocksData[symbol][date]["4. close"] *
                    symbolToQuantity[symbol];
            } else {
                aggregatedSumOfAllStocks += lastPriceForSymbol[symbol];
            }
        });

        // Simply check if this is a maximum or a minimum value based on the results untill now
        if (aggregatedMax < aggregatedSumOfAllStocks) {
            aggregatedMax = aggregatedSumOfAllStocks;
            dateMax = date;
        }
        if (aggregatedMin > aggregatedSumOfAllStocks) {
            aggregatedMin = aggregatedSumOfAllStocks;
            dateMin = date;
        }
    }

    // According to the definition
    let MDD = (aggregatedMin - aggregatedMax) / aggregatedMax;

    return {
        MDD,
        dateMax,
        dateMin,
        maxValue: aggregatedMax.toFixed(4),
        minValue: aggregatedMin.toFixed(4)
    };
}

// Step 3: Standard Deviation and Sharpe Ratio
function standardDeviation(portfolio, stocksData) {}

function sharpeRatio(portfolio, stocksData) {}

/**
 * Returns the best and worst year performance of a portfolio.
 * Measurements: Change and growth rate
 * @param {object} portfolio Portfolio from finAPI
 * @param {{symbol: {date: {"1. open": "20.6350", "2. high": "71.7300", "3. low": "70.5200","4. close": "71.4900", "5. volume": "114923"}}}} stocksData Stocks data according to symbols
 * @returns {{bestYear: {changeBest, yearBest, growthRateBest}, worstYear: {changeWorst, yearWorst, growthRateWorst}}}
 * An object containing data about the best and worst year
 */
function bestAndWorstYear(portfolio, stocksData) {
    const [symbolToQuantity, symbols] = getSymbolsAndMappingToQuantity(
        portfolio
    );

    let years = getStocksDateAccordingToYears(stocksData);

    let changeBest = -9999999999;
    let changeWorst = 9999999999;
    let yearBest = "";
    let yearWorst = "";
    let growthRateBest = 0;
    let growthRateWorst = 0;

    // For each years e.g 2015, 2016
    Object.keys(years).forEach((currYear) => {
        let startPortfolioValue = 0;
        let endPortfolioValue = 0;
        // For each symbol TSLA, ... in year 2015, 2016...
        Object.keys(years[currYear]).forEach((currSymbol) => {
            // Last date of the given year
            let endDateForSymbol = years[currYear][currSymbol][0];

            // First date of the given year
            let startDateForSymbol =
                years[currYear][currSymbol][
                    years[currYear][currSymbol].length - 1
                ];

            // Summing up everything
            startPortfolioValue +=
                stocksData[currSymbol][startDateForSymbol]["4. close"] *
                symbolToQuantity[currSymbol];
            endPortfolioValue +=
                stocksData[currSymbol][endDateForSymbol]["4. close"] *
                symbolToQuantity[currSymbol];
        });
        // Calculate the change
        let currChange = endPortfolioValue - startPortfolioValue;
        // Calculate the growth rate
        let currGrowthRate =
            (endPortfolioValue - startPortfolioValue) / startPortfolioValue;
        // Simple checks
        if (currChange > changeBest) {
            changeBest = currChange.toFixed(4);
            growthRateBest = currGrowthRate.toFixed(4);
            yearBest = currYear;
        }
        if (currChange < changeWorst) {
            changeWorst = currChange.toFixed(4);
            growthRateWorst = currGrowthRate.toFixed(4);
            yearWorst = currYear;
        }
    });
    //changeBest = changeBest:changeBest
    return {
        bestYear: {
            changeBest,
            yearBest,
            growthRateBest
        },
        worstYear: {
            changeWorst,
            yearWorst,
            growthRateWorst
        }
    };
}

/**
 *  Extracts the symbols and the symbols to quantity mapping
 * @param {object} portfolio Portfolio from finAPI
 * @returns {[{symbol: number}, [string]]} [symbolToQuantity, symbols]
 *
 */
function getSymbolsAndMappingToQuantity(portfolio) {
    let symbolToQuantity = {};
    let symbols = [];

    portfolio.securities.forEach((element) => {
        symbolToQuantity[namesToSymbols[element.name]] =
            element.quantityNominal;
        symbols.push(namesToSymbols[element.name]);
    });
    return [symbolToQuantity, symbols];
}

// const [symbolToQuantity,symbols] = getSymbolsAndMappingToQuantity
/**
 *  Extracts the dates according to the symbols and orders them by years.
 * @param {{symbol: {date: {"1. open": "20.6350", "2. high": "71.7300", "3. low": "70.5200","4. close": "71.4900", "5. volume": "114923"}}}} stocksData Stocks data according to symbols
 * @returns {{year: {symbol: {date: { "1. open": "20.6350", "2. high": "71.7300", "3. low": "70.5200","4. close": "71.4900", "5. volume": "114923"}}}}}
 * An object: "2015" -> "IBM" -> "2015-01-01" -> "4. close": "150.00"
 */
function getStocksDateAccordingToYears(stocksData) {
    let years = {};
    Object.keys(stocksData).forEach((currSymbol) => {
        Object.keys(stocksData[currSymbol]).forEach((currDate) => {
            let jsDate = new Date(currDate);
            if (jsDate.getFullYear() in years) {
                if (currSymbol in years[jsDate.getFullYear()]) {
                    const yearsArray = years[jsDate.getFullYear()][currSymbol];
                    yearsArray.push(currDate);
                    years[jsDate.getFullYear()][currSymbol] = yearsArray;
                } else {
                    years[jsDate.getFullYear()][currSymbol] = [currDate];
                }
            } else {
                years[jsDate.getFullYear()] = {};
                years[jsDate.getFullYear()][currSymbol] = [currDate];
            }
        });
    });

    return years;
}

exports.finalPortfolioBalance = finalPortfolioBalance;
exports.mdd = mdd;
exports.standardDeviation = standardDeviation;
exports.sharpeRatio = sharpeRatio;
exports.bestAndWorstYear = bestAndWorstYear;