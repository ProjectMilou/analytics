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
 * Returns the price-earning and average  ratio from the company overview
 * regarding the quantity of stocks bought
 * @param {object} portfolio Portfolio from finAPI 
 * @param {{symbol1: {}, symbolN: {}}} symbolCompanyOverview 
 * @returns  {{
 * peRatio: {peRatio: number},
 * averagePEration: {averagePEration: totalPEratio}
 * }}
 */
function getPriceEarningRatio(portfolio, symbolCompanyOverview) {
    let peRation = {};
    let totalPEratio = 0;
    let averagePEration = 0;
    let symbolsToQuantity = {};

    let totalQuantity = 0;
    portfolio.securities.forEach((element) => {
        symbolsToQuantity[namesToSymbols[element.name]] =
            element.quantityNominal;
        totalQuantity += element.quantityNominal;
    });

    let lambda = 1 / totalQuantity;
    Object.keys(symbolsToQuantity).forEach((symbol) => {
        symbolsToQuantity[symbol] *= lambda
    });
    console.log(symbolsToQuantity);
    Object.keys(symbolCompanyOverview).forEach((symbol) => {

        peRation[symbol] = symbolCompanyOverview[symbol].PERatio;

        totalPEratio += symbolCompanyOverview[symbol].PERatio *
            symbolsToQuantity[symbol];

    });
    totalPEratio = totalPEratio;

    return {
        peRation,
        averagePEration: totalPEratio,
    };
}

exports.getPriceEarningRatio = getPriceEarningRatio;