/**
 * Returns the price-earning, average and total ratio from the company overview
 * @param {{symbol1: {}, symbolN: {}}} symbolCompanyOverview 
 * @returns  {{
 * peRatio: {peRatio: peRatio},
 * averagePEration: {averagePEration: averagePEration}
 * totalPEratio: {totalPEratio: totalPEratio}
 * }}
 */
function getPriceEarningRation(symbolCompanyOverview) {
    let peRation = {};
    let totalPEratio = 0;
    let averagePEration = 0;
    Object.keys(symbolCompanyOverview).forEach((symbol) => {
        peRation[symbolCompanyOverview[symbol].PERatio] = symbolCompanyOverview[symbol].PERatio;
        totalPEratio += symbolCompanyOverview[symbol].PERatio;
    });
    averagePEration = totalPEratio / symbolCompanyOverview.length;
    return {
        peRation,
        averagePEration,
        totalPEratio
    };
}

exports.getPriceEarningRation = getPriceEarningRation;