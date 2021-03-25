/**
 * Returns the dividendyield in % of the company overview
 * @param {{symbol1: {}, symbolN: {}}} symbolCompanyOverview 
 * @returns  {{
 * dividendyield: {dividendyield: dividendyield%}
 * }}
 */
function getDividendyield(symbolCompanyOverview) {
    let dividendyield = {};
    Object.keys(symbolCompanyOverview).forEach((symbol) => {
        let content = ymbolCompanyOverview[symbol].DividendYield;
        dividendyield[content] = (parseFloat(content) * 100).toFixed(2) + "%";
    });
    return {
        dividendyield
    };
}