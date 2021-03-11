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

function maxDrawdown(portfolio, stocksData) {

const firstSecurityStockData =stocksData[namesToSymbols[portfolio.securities[0].name]]

const endDate = Object.keys(firstSecurityStockData)[0];
const startDate= Object.keys(firstSecurityStockData)[Object.keys(firstSecurityStockData).length-1]

let startValue=0;
let endValue=0;
portfolio.securities.forEach((stock)=>{
    startValue+= stocksData[namesToSymbols[stock.name]][startDate]["4. close"]*stock.quantityNominal
    endValue+= stocksData[namesToSymbols[stock.name]][endDate]["4. close"]*stock.quantityNominal
});
//only for testing
/*console.log("start: "+startDate);
console.log("end: "+endDate);
console.log(Object.keys(stocksData[namesToSymbols[firstSecurity.name]]))
console.log(startValue);
console.log(endValue);*/
const yearDif=(new Date(endDate)-new Date(startDate))/1000/60/60/24/365 
const CAGR= (endValue/startValue)**(1/yearDif)-1
console.log(yearDif);
console.log(CAGR);
return CAGR;
}

// Step 3: Standard Deviation and Sharpe Ratio
function standardDeviation(portfolio, stocksData) {}

function sharpeRatio(portfolio, stocksData) {}

// Step 4: CompoundAnnualGrowthRate
function compoundAnnualGrowthRate(portfolio,stocksData){

}


// Step 5: Performance in Best and Worst Year
function performanceBestYear(portfolio, stocksData) {}

function performanceWorstYear(portfolio, stocksData) {}

exports.finalPortfolioBalance = finalPortfolioBalance;
exports.maxDrawdown = maxDrawdown;
exports.standardDeviation = standardDeviation;
exports.sharpeRatio = sharpeRatio;
exports.performanceBestYear = performanceBestYear;
exports.performanceWorstYear = performanceWorstYear;
