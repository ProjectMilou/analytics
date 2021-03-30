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

        // Adds a string to a number => totalDivdendyield becomes string
        totalDividendyield += content;

        // Why not dividendyield[symbol] ?
        dividendyield[content] = (parseFloat(content) * 100).toFixed(2) + "%";

        // Why iterate through a portfolio for each symbol of company overview ?
        portfolio.securities.forEach((element) => {
            if (namesToSymbols[element.name] === symbolCompanyOverview[symbol].Symbol) {

                // Adding numbers to a string (look line 32, 33 and 26)
                totalDividendyield += element.quantityNominal *
                    parseFloat(symbolCompanyOverview[symbol].DividendYield);
                totalQuantity += element.quantityNominal;
            }
        });
    });
    averageDividendyield = totalDividendyield / totalQuantity;

    // Why converting everything to strings ?
    averageDividendyield = (averageDividendyield * 100).toFixed(2) + "%";
    totalDividendyield = (totalDividendyield * 100).toFixed(2) + "%";
    return {
        dividendyield,
        averageDividendyield,
        totalDividendyield
    };
}

exports.getDividendyield = getDividendyield;