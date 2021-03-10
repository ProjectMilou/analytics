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

    Maximum Drawdown =  Minimimum Value - Maximum Value  / Maximum Value


*/

function maxDrawdown(portfolio, stocksData) {}

// Step 3: Standard Deviation and Sharpe Ratio
function standardDeviation(portfolio, stocksData) {}

function sharpeRatio(portfolio, stocksData) {}

// Step 5: Performance in Best and Worst Year
function performanceBestYear(portfolio, stocksData) {}

function performanceWorstYear(portfolio, stocksData) {}

exports.finalPortfolioBalance = finalPortfolioBalance;
exports.maxDrawdown = maxDrawdown;
exports.standardDeviation = standardDeviation;
exports.sharpeRatio = sharpeRatio;
exports.performanceBestYear = performanceBestYear;
exports.performanceWorstYear = performanceWorstYear;
