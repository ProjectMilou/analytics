
/**
 *  Debt/Equity = Total Liabilities / Total Shareholders Equity
 *  `WHERE`
 *  Total Shareholders Equity = Total Assets - Total Liabilites
 * @param {object} portfolio Portfolio from finAPI
 * @param {object} balanceSheetPerSymbol Balance sheet from finAPI by the symbols in the portfolio
 * @returns {{debtEquityPerStock: {symbol: number}, totalDebtEquity: number, averageDebtEquity: number}}
 * Returns the debt/equity for each stock in the portfolio, the total debt/equity and
 * the average debt/equity of the portfolio
 */
function debtEquity(portfolio, balanceSheetPerSymbol) {

    /*
        
    */
    let results = {}
    let totalDebtEquity = 0;

    Object.keys(balanceSheetPerSymbol).forEach(symbol => {
        let totalAssets = balanceSheetPerSymbol[symbol].annualReports[0].totalAssets;
        let totalLiabilities = balanceSheetPerSymbol[symbol].annualReports[0].totalLiabilities;
        let currEquityDebt = totalLiabilities / (totalAssets - totalLiabilities);
        results[symbol] = currEquityDebt
        totalDebtEquity += currEquityDebt
    });

    return {
        debtEquityPerStock: results,
        totalDebtEquity,
        averageDebtEquity: totalDebtEquity / Object.keys(balanceSheetPerSymbol).length
    };
}

exports.debtEquity = debtEquity;