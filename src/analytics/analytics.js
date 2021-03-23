// Entry point for any analytics

const backtesting = require('./backtesting/backtesting')

function backtest(portfolio, stocksData) {
    const MDD = backtesting.mdd(portfolio, stocksData);
    const BWY = backtesting.bestAndWorstYear(portfolio, stocksData);
    const FPV = backtesting.finalPortfolioBalance(portfolio, stocksData);

    const CAGR = backtesting.compoundAnnualGrowthRate(portfolio, stocksData);
    backtesting.stockCorrelationAndStandardDeviation(portfolio, stocksData);
    const standardDeviation = backtesting.standardDeviation(portfolio, stocksData);
    const sharpeRatio = backtesting.sharpeRatio(portfolio, stocksData);

    const backTestedPortfolio = {
        ...MDD,
        ...BWY,
        ...FPV,
        CAGR,
        standardDeviation,
        sharpeRatio
    }

    return backTestedPortfolio
}

exports.backtest = backtest;