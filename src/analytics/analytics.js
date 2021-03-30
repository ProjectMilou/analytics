// Entry point for any analytics

const backtesting = require('./backtesting/backtesting')

/**
 * Calculates the Maximum Drawdown, Best and Worst year, Final Portfolio Balance,
 * Compound Annual Growth Rate, Standard Deviation and Sharpe Ratio of a portfolio
 * over a historical time span
 * @param {object} portfolio Portfolio from finAPI
 * @param {{symbol: {date: {"1. open": "20.6350", "2. high": "71.7300", "3. low": "70.5200","4. close": "71.4900", "5. volume": "114923"}}}} stocksData Stocks data according to symbols
 * @returns An object containing the analyzed data
 */
function backtest(portfolio, stocksData) {
    const MDD = backtesting.mdd(portfolio, stocksData);
    const BWY = backtesting.bestAndWorstYear(portfolio, stocksData);
    const FPV = backtesting.finalPortfolioBalance(portfolio, stocksData);

    const CAGR = backtesting.compoundAnnualGrowthRate(portfolio, stocksData);
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