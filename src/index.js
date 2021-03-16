const api = require("./api/alphaVantage");

console.log("Queries are printed before the results.");

async function testIntraday() {
    try {
        const data = await api.getTimeSeriesIntraday("IBM", "30min");
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}

async function testDaily() {
    try {
        const data = await api.getTimeSeriesDaily("TSLA");
        const fs = require("fs");
        fs.writeFile('./symbolWeeklyData/TSLA.json', JSON.stringify(data, null, 2), (err) => {
            if (err) console.log('Error writing file:', err)
        });

        console.log(data);
    } catch (err) {
        console.log(err);
    }
}

async function testWeekly() {
    try {
        const data = await api.getTimeSeriesWeekly("BAS.FRK");
        /*entering new data
        
        */
    } catch (err) {
        console.log(err);
    }
}

async function testMonthly() {
    try {
        const data = await api.getTimeSeriesMonthly("BAS.FRK");

        console.log(data);
    } catch (err) {
        console.log(err);
    }
}

async function testCompanyOverview() {
    try {
        const data = await api.getCompanyOverview("IBM");
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}

async function testSymbolSearch() {
    try {
        const data = await api.getSymbolForKeyword("BAS.FRK");
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}

// Uncomment the functions below if you want to see the responses :)

//testIntraday();
testDaily();
//testWeekly();
//testMonthly();
//testCompanyOverview();
//testSymbolSearch();
