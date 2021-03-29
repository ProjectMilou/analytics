const namesToSymbols = {
    Tesla: "TSLA",
    Bayer: "BAYRY",
    "BASF SE NA O.N.": "BAS",
    Apple: "AAPL",
    Amazon: "AMZN",
    Google: "GOOGL",
    IBM: "IBM",
    "Alibaba group": "BABA",
    "JPMorgan Chase & Co.": "JPM"
};

/**
 * Returns the average, total and the dividendyield in % of the company overview
 * regarding the quantity of stocks bought
 * @param {object} portfolio Portfolio from finAPI
 * @param {{symbol1: {}, symbolN: {}}} symbolCompanyOverview 
 * @returns  {{
 * dividendyield: {dividendyield: dividendyield%}
 * averageDividendyield: {averageDividendyield: averageDividendyield}
 * totalDividendyield: {totalDividendyield: totalDividendyield%}
 * }}
 */
function getDividendyield(portfolio, symbolCompanyOverview) {
    let dividendyield = {};
    let totalDividendyield = 0;
    let averageDividendyield = 0;
    let totalQuantity = 0;
    Object.keys(symbolCompanyOverview).forEach((symbol) => {
        let content = symbolCompanyOverview[symbol].DividendYield;
        totalDividendyield += content;
        dividendyield[content] = (parseFloat(content) * 100).toFixed(2) + "%";
        portfolio.securities.forEach((element) => {
            if (namesToSymbols[element.name] === symbolCompanyOverview[symbol].Symbol) {
                totalDividendyield += element.quantityNominal *
                    parseFloat(symbolCompanyOverview[symbol].DividendYield);
                totalQuantity += element.quantityNominal;
            }
        });
    });
    averageDividendyield = totalDividendyield / totalQuantity;
    averageDividendyield = (averageDividendyield * 100).toFixed(2) + "%";
    totalDividendyield = (totalDividendyield * 100).toFixed(2) + "%";
    return {
        dividendyield,
        averageDividendyield,
        totalDividendyield
    };
}

exports.getDividendyield = getDividendyield;