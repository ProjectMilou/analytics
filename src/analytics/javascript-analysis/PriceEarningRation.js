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
 * Returns the price-earning, average and total ratio from the company overview
 * regarding the quantity of stocks bought
 * @param {object} portfolio Portfolio from finAPI 
 * @param {{symbol1: {}, symbolN: {}}} symbolCompanyOverview 
 * @returns  {{
 * peRatio: {peRatio: peRatio},
 * averagePEration: {averagePEration: averagePEration}
 * totalPEratio: {totalPEratio: totalPEratio}
 * }}
 */
function getPriceEarningRation(portfolio, symbolCompanyOverview) {
    let peRation = {};
    let totalPEratio = 0;
    let averagePEration = 0;
    let totalQuantity = 0;
    Object.keys(symbolCompanyOverview).forEach((symbol) => {

        // Why not PERatio[symbol] ?
        peRation[symbolCompanyOverview[symbol].PERatio] = symbolCompanyOverview[symbol].PERatio;

        // Why iterating through the portfolio for each symbol of company overview ?
        portfolio.securities.forEach((element) => {
            if (namesToSymbols[element.name] === symbolCompanyOverview[symbol].Symbol) {
                totalPEratio += element.quantityNominal *
                    parseFloat(symbolCompanyOverview[symbol].PERatio);
                totalQuantity += element.quantityNominal;
            }
        });
    });

    averagePEration = totalPEratio / totalQuantity;
    return {
        peRation,
        averagePEration,
        totalPEratio
    };
}

exports.getPriceEarningRation = getPriceEarningRation;