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
function finalPortfolioBalance(portfolio, stocksData) {}

// Step 2: Max Drawdown
/*
    A maximum drawdown (MDD) is the maximum observed loss from a peak to a trough of a portfolio,
    before a new peak is attained. Maximum drawdown is an indicator of downside risk over a specified
    time period.

    Maximum drawdown (MDD) is a measure of an asset's largest price drop from a peak to a trough.

    Maximum Drawdown =  Minimimum Value - Maximum Value  / Maximum Value

    TODO: DISCUSS - Assumption that all the assets are bought in EUR;
                    All the assets are sold on the same date; 

*/

function mddAndBestWorstYear(portfolio, stocksData) {
    let symbolToQuantity = {};
    let symbols = [];

    portfolio.securities.forEach((element) => {
        symbolToQuantity[namesToSymbols[element.name]] =
            element.quantityNominal;
        symbols.push(namesToSymbols[element.name]);
    });

    // Just for testing;
    console.log("********************************");
    console.log("Stock symbols: ", symbols);
    console.log(
        "Quantity of stocks (can be converted to weights array)\n",
        symbolToQuantity
    );

    let aggregatedMax = 0;
    let aggregatedMin = 9999999;
    let dateMax = "";
    let dateMin = "";

    // Assuming that all the stocks are sold on the same dates
    // Get the dates of the first Symbol and just iterate through them
    // and use these dates for the other symbols as well
    const datesOfFirstSymbol = stocksData[symbols[0]];

    for (const [date, values] of Object.entries(datesOfFirstSymbol)) {
        let aggregatedSumOfAllStocks = 0;

        // For each of symbols calculate the amount of Stocks * price of stocks
        // Add the result to an aggregated sum of all stocks
        // Also ASSUMING that the value is given in EUR.

        symbols.forEach((symbol) => {
            aggregatedSumOfAllStocks +=
                stocksData[symbol][date]["4. close"] * symbolToQuantity[symbol];
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

    // Just for testing;
    console.log("********************************");
    console.log("Date of maximum value: ", dateMax);
    console.log("Aggregated maximum value:", aggregatedMax);
    console.log("Date of minimum value: ", dateMin);
    console.log("Aggregated minimum value: ", aggregatedMin);
    console.log(`Maximum Drawdown: ${(MDD * 100).toFixed(2)}%`);
    console.log("********************************");

    return {
        MDD,
        bestYear: {
            year: dateMax.slice(0, 4),
            value: aggregatedMax
        },
        worstYear: {
            year: dateMin.slice(0, 4),
            value: aggregatedMin
        }
    };
}

// Step 3: Standard Deviation and Sharpe Ratio
function standardDeviation(portfolio, stocksData) {}

function sharpeRatio(portfolio, stocksData) {}

exports.finalPortfolioBalance = finalPortfolioBalance;
exports.mddAndBestWorstYear = mddAndBestWorstYear;
exports.standardDeviation = standardDeviation;
exports.sharpeRatio = sharpeRatio;
