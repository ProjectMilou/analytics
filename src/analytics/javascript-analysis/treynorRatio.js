const backtesting = require('../backtesting/backtesting.js');
const { namesToSymbols } = require("../../static/names-symbols-mapping");




function treynorRatio(portfolio, stocksData, symbolToBeta) {
    const usedDates = backtesting.getDaysAvailableInAll(portfolio, stocksData);
    const portfolioReturn = backtesting.compoundAnnualGrowthRate(portfolio, stocksData);
    const riskFreeRate = backtesting.getRiskFreeRateOnDate(usedDates[usedDates.length - 1]) / 100;
    const weights = weightsToName(portfolio, stocksData);

    let portfolioBeta = 0;
    portfolio.securities.forEach((stock) => {
        portfolioBeta += weights[stock.name] * symbolToBeta[namesToSymbols[stock.name]];
    });

    return (portfolioReturn - riskFreeRate) / portfolioBeta;
}

function weightsToName(portfolio, stocksData) {
    const usedDates = backtesting.getDaysAvailableInAll(portfolio, stocksData);
    const date = usedDates[0];

    let portfolioSum = 0;
    portfolio.securities.forEach((stock) => {
        portfolioSum += stocksData[namesToSymbols[stock.name]][date]["4. close"] * stock.quantityNominal;
    });

    let nameToWeight = {};
    portfolio.securities.forEach((stock) => {
        nameToWeight[stock.name] = Number(stocksData[namesToSymbols[stock.name]][date]["4. close"] * stock.quantityNominal) / portfolioSum;
    });

    return nameToWeight;

}

exports.weights = weightsToName;
exports.treynorRatio = treynorRatio;