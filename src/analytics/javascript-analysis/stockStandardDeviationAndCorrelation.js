const stats = require("stats-lite");
const calculateCorrelation = require("calculate-correlation");

const namesToSymbols = {
    Tesla: "TSLA",
    Bayer: "BAYRY",
    "BASF SE NA O.N.": "BAS"
};

function standardDeviationAndCorrelation(portfolio, stocksData) {
    //may need to find starting date and combine all dates
    //need to use dailyinfo
    //either only use data available in all or use last updated value
    const usedDates = getDaysAvailableInAll(portfolio, stocksData); //Object.keys(stocksData[namesToSymbols[portfolio.securities[0].name]]);
    const numDays = usedDates.length;
    let valuesOfStock = {};
    let correlations = {};

    //put allvalues for each stock in an array
    portfolio.securities.forEach((stock) => {
        let lastValue = 0;
        valuesOfStock[stock.name] = [];
        for (i = numDays - 2; i >= 0; i--) {
            if (
                usedDates[i] in stocksData[namesToSymbols[stock.name]] &&
                usedDates[i + 1] in stocksData[namesToSymbols[stock.name]]
            ) {
                //return in period
                lastValue =
                    Number(
                        stocksData[namesToSymbols[stock.name]][usedDates[i]][
                        "4. close"
                        ]
                    ) /
                    Number(
                        stocksData[namesToSymbols[stock.name]][
                        usedDates[i + 1]
                        ]["4. close"]
                    ) -
                    1;
            }
            valuesOfStock[stock.name].push(lastValue);
        }
    });
    //calculate correlation
    for (stock1 of portfolio.securities) {
        for (stock2 of portfolio.securities) {
            if (stock1 == stock2) {
                break;
            }
            const correlationKey = getCorrelationKey(stock1, stock2);
            if (correlationKey in correlations) {
                break;
            } else {
                correlations[correlationKey] = calculateCorrelation(
                    valuesOfStock[stock1.name],
                    valuesOfStock[stock2.name]
                );
            }
        }
    }

    let standardDeviation = {};
    portfolio.securities.forEach((stock) => {
        standardDeviation[stock.name] = stats.stdev(valuesOfStock[stock.name]);
    });

    console.log(valuesOfStock);

}

function getCorrelationKey(stock1, stock2) {
    if (stock1.name < stock2.name) return stock1.name + "to" + stock2.name;
    else return stock2.name + " to " + stock1.name;
}
function getDaysAvailableInAll(portfolio, stocksData) {
    let usedDates = Object.keys(
        stocksData[namesToSymbols[portfolio.securities[0].name]]
    );
    usedDates.forEach((date) => {
        let dateInAll = true;
        portfolio.securities.forEach((stock) => {
            if (!(date in stocksData[namesToSymbols[stock.name]])) {
                dateInAll = false;
            }
        });
        if (!dateInAll) {
            const index = usedDates.indexOf(date);
            if (index > -1) {
                usedDates.splice(index, 1);
            }
        }
    });
    return usedDates;
}


exports.standardDeviationAndCorrelation = standardDeviationAndCorrelation;
