/**
 * Returns the average, total and the dividendyield in % of the company overview
 * @param {{symbol1: {}, symbolN: {}}} symbolCompanyOverview 
 * @returns  {{
 * dividendyield: {dividendyield: dividendyield%}
 * averageDividendyield: {averageDividendyield: averageDividendyield}
 * totalDividendyield: {totalDividendyield: totalDividendyield%}
 * }}
 */
function getDividendyield(symbolCompanyOverview) {
    let dividendyield = {};
    let totalDividendyield = 0;
    let averageDividendyield = 0;
    Object.keys(symbolCompanyOverview).forEach((symbol) => {
        let content = symbolCompanyOverview[symbol].DividendYield;
        totalDividendyield += content;
        dividendyield[content] = (parseFloat(content) * 100).toFixed(2) + "%";
    });
    averageDividendyield = totalDividendyield / symbolCompanyOverview.length;
    totalDividendyield = (parseFloat(totalDividendyield) * 100).toFixed(2) + "%";
    averageDividendyield = (parseFloat(averageDividendyield) * 100).toFixed(2) + "%";
    return {
        dividendyield,
        averageDividendyield,
        totalDividendyield
    };
}

exports.getDividendyield = getDividendyield;