# analytics

## Backtesting

Testing the performance of a portfolio over a historical time span

#### Inputs:

| Parameters | Type                                                                                     |
| ---------- | ---------------------------------------------------------------------------------------- |
| portfolio  | The exact same portfolio, which can be fetched from the finApi                           |
| stocksData | Daily/Weekly/Monthly Time Series in the from of {symbol: data fetched from AlphaVantage} |
| fromDate   | Date                                                                                     |
| startDate  | Date                                                                                     |

#### Outputs:

| Parameters            | Type                              |
| --------------------- | --------------------------------- |
| MDDMaxToMin           | number as String                  |
| MDDInitialToMin       | number as String                  |
| dateMax               | Date as String                    |
| dateMin               | Date as String                    |
| maxValue              | number as String                  |
| minValue              | number as String                  |
| initialValue          | number as String                  |
| bestYear              | {                                 |
|                       | changeBest: number as String      |
|                       | yearBest: Date as String          |
|                       | growthRateBest: number as String} |
|                       | }                                 |
| worstYear             | {                                 |
| changeWorst           | number as String,                 |
| yearWorst             | Date as String,                   |
| growthRateWorst       | number as String                  |
|                       | }                                 |
| finalPortfolioBalance | number as String,                 |
| CAGR                  | number                            |
| standardDeviation     | number                            |
| sharpeRatio           | number                            |

#### Example output:

```javascript
{
    "MDDMaxToMin": "-0.6242",
    "MDDInitialToMin": "0.0000",
    "dateMax": "2021-02-05",
    "dateMin": "2017-01-06",
    "maxValue": "17333.6900",
    "minValue": "6513.9700",
    "initialValue": "6513.9700",
    "bestYear": {
        "changeBest": "3914.8400",
        "yearBest": "2020",
        "growthRateBest": "0.3336"
    },
    "worstYear": {
        "changeWorst": "-137.9000",
        "yearWorst": "2018",
        "growthRateWorst": "-0.0153"
    },
    "finalPortfolioBalance": "10156.1700",
    "CAGR": 0.24892224713946032,
    "standardDeviation": 0.030303142486978612,
    "sharpeRatio": 0.46716646357345853
}
```

## npm start

Runs index.js which currently performs backtesting on a portfolio and returns the results.

## npm run pythonTest

Spawns a child python process and prints out what it returns
