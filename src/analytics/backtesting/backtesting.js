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
function finalPortfolioBalance(portfolio, stocksData) { }

/**
 *It should return the finalPortfolioBalance for a given timespan
 *Core idea: of all symbols of the two given years
 *and adds the difference between end and start portfolio value of each stock
 *
 * @param {object} portfolio Portfolio from finAPI
 * @param {{symbol: {date: {"1. open": "20.6350", "2. high": "71.7300", "3. low": "70.5200","4. close": "71.4900", "5. volume": "114923"}}}} stocksData Stocks data according to symbols
 * @returns {{totalBalance:number}}depending whaether the final sum is negative or positive returns sum or 0
 */
function finalPortfolioBalance(portfolio, stocksData) {
    const [symbolToQuantity, symbols] = getSymbolsAndMappingToQuantity(
        portfolio
    );

    let years = getStocksDateAccordingToYears(stocksData);
    let startYear = Object.keys(years)[0];
    let endYear = Object.keys(years)[Object.keys(years).length - 1];
    let totalBalance = 0;
    let totalStartYear = 0;
    let totalEndYear = 0;
    symbols.forEach((symbol) => {
        //I assume the length of dates in the symbols is equal for both startYear and endYear
        console.log(symbol);
        let dateForStartSymbol =
            years[startYear][symbol][years[startYear][symbol].length - 1];
        let dateForEndSymbol = years[endYear][symbol][0];
        totalStartYear +=
            stocksData[symbol][dateForStartSymbol]["4. close"] *
            symbolToQuantity[symbol];
        totalEndYear +=
            stocksData[symbol][dateForEndSymbol]["4. close"] *
            symbolToQuantity[symbol];

        //console.log(dateForStartSymbol);
        //console.log(dateForEndSymbol);
        //console.log(startYear);
        //console.log(endYear);
    });
    console.log(totalStartYear);
    console.log(totalEndYear);
    totalBalance = totalEndYear - totalStartYear;
    if (totalBalance < 0) {
        return { totalBalance: 0 };
    }
    return {
        totalBalance: totalBalance.toFixed(4)
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
    }
}
exports.finalPortfolioBalance = finalPortfolioBalance;
exports.mdd = mdd;
exports.standardDeviation = standardDeviation;
exports.sharpeRatio = sharpeRatio;
exports.compoundAnnualGrowthRate = compoundAnnualGrowthRate;
exports.stockCorrelationAndStandardDeviation = stockCorrelationAndStandardDeviation;
