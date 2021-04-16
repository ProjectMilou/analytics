const { namesToSymbols } = require("../../static/names-symbols-mapping")
const stockCorrelation = require("./stockStandardDeviationAndCorrelation");
const backTesting = require('../backtesting/backtesting.js');



function getPortfolioOptimization(portfolio, stockData) {
    let numerator = 0;
    let denominator = 0;
    let corrrelation =
        stockCorrelation.standardDeviationAndCorrelation(portfolio, stockData).correlations;
    const returnOnStock = stockCorrelation.returnAnnual(portfolio, stockData);
    const dateSymbolArr = backTesting.getDaysAvailableInAll(portfolio, stockData);
    const dateSymbol = dateSymbolArr[0];
    const Rf = (backTesting.getRiskFreeRateOnDate(dateSymbol)) / 100;
    const stockWeights = getStockWeight(portfolio, stockData);
    portfolio.securities.forEach((stock) => {
        const Wi = stockWeights.stockWeight[stock.name];
        const mi = returnOnStock[stock.name];
        numerator += Wi * (mi - Rf);
    });


    console.log(returnOnStock);
    console.log(stockWeights);
    console.log(numerator);
    portfolio.securities.forEach((stock1) => {
        portfolio.securities.forEach((stock2) => {
            if (!(stock2 === stock1)) {
                const Oij = corrrelation[stockCorrelation.getCorrelationKey(stock1, stock2)];
                const Wi = stockWeights.stockWeight[stock1.name];
                const Wj = stockWeights.stockWeight[stock2.name];
                denominator = Wi * Wj * Oij;

            }
        });
    });
    console.log(denominator);
    denominator = Math.sqrt(denominator);
    const result = numerator / denominator;
    return result;
}

function getStockWeight(portfolio, stockData) {
    let totalValueOfPortfolio = 0;
    let dateSymbolArr = backTesting.getDaysAvailableInAll(portfolio, stockData);
    let dateSymbol = dateSymbolArr[0];
    portfolio.securities.forEach((stock) => {
        totalValueOfPortfolio += stock.quantityNominal *
            stockData[namesToSymbols[stock.name]][dateSymbol]["4. close"];
    });
    let stockWeight = {};
    portfolio.securities.forEach((stock) => {
        stockWeight[stock.name] = (stock.quantityNominal *
            stockData[namesToSymbols[stock.name]][dateSymbol]["4. close"]) / totalValueOfPortfolio;
    });
    return {
        stockWeight
    };
}



exports.getPortfolioOptimization = getPortfolioOptimization;