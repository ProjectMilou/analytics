/**
 * Returns the price-earning ratio from the company overview
 * @param {{symbol1: {}, symbolN: {}}} symbolCompanyOverview 
 * @returns  {{
 * peRatio: {peRatio: peRatio}
 * }}
 */
function getPriceEarningRation(symbolCompanyOverview) {
    let peRation = {};
    Object.keys(symbolCompanyOverview).forEach((symbol) => {
        peRation[symbolCompanyOverview[symbol].PERatio] = symbolCompanyOverview[symbol].PERatio;
    });
    return {
        peRation
    };
}

exports.getPriceEarningRation = getPriceEarningRation;