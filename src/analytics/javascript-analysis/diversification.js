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

function getDiversification(portfolio, symbolCompanyOverview) {
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

    console.log(symbolsToQuantity)

    let industries = {};
    let countries = {};
    let currencies = {};
    let assetClasses = {};
    let sectors = {}

    Object.keys(symbolCompanyOverview).forEach((symbol) => {
        let currIndustry = symbolCompanyOverview[symbol].Industry;
        let currCountry = symbolCompanyOverview[symbol].Country;
        let currCurrency = symbolCompanyOverview[symbol].Currency;
        let currAssetClass = symbolCompanyOverview[symbol].AssetType;
        let currSector = symbolCompanyOverview[symbol].Sector;

        if (!(currIndustry in industries)) {
            industries[currIndustry] = symbolsToQuantity[symbol];
        } else {
            industries[currIndustry] += symbolsToQuantity[symbol];
        }

        if (!(currCountry in countries)) {
            countries[currCountry] = symbolsToQuantity[symbol];
        } else {
            countries[currCountry] += symbolsToQuantity[symbol];
        }

        if (!(currCurrency in currencies)) {
            currencies[currCurrency] = symbolsToQuantity[symbol];
        } else {
            currencies[currCurrency] += symbolsToQuantity[symbol];
        }

        if (!(currAssetClass in assetClasses)) {
            assetClasses[currAssetClass] = symbolsToQuantity[symbol];
        } else {
            assetClasses[currAssetClass] += symbolsToQuantity[symbol];
        }

        if (!(currSector in sectors)) {
            sectors[currSector] = symbolsToQuantity[symbol];
        } else {
            sectors[currSector] += symbolsToQuantity[symbol];
        }
    });

    return {
        industries,
        countries,
        currencies,
        assetClasses,
        sectors
    };
}

exports.getDiversification = getDiversification;
