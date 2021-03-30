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

| Parameters            | Type                              | Explanation                                                                                         |
| --------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------- |
| MDDMaxToMin           | number as String                  | The maximum drawdown of a portfolio according to the maximum and minimum observed value             |
| MDDInitialToMin       | number as String                  | The maximum drawdown of a portfolio according to the initial and minimum observed value             |
| dateMax               | Date as String                    | The date at which the portfolio value was the highest                                               |
| dateMin               | Date as String                    | The date at which the portfolio value was the lowest                                                |
| maxValue              | number as String                  | The maximum observed value of the portfolio                                                         |
| minValue              | number as String                  | The minimum observed value of the portfolio                                                         |
| initialValue          | number as String                  | The initial value of the portfolio or how much it costed to buy all the stocks at the starting date |
| bestYear              | {                                 | Best Year performance                                                                               |
|                       | changeBest: number as String      | The change of the value of the portfolio                                                            |
|                       | yearBest: Date as String          | The year itself                                                                                     |
|                       | growthRateBest: number as String} | The growth rate of the portfolio value in this year                                                 |
|                       | }                                 |                                                                                                     |
| worstYear             | {                                 | Worst Year performance                                                                              |
| changeWorst           | number as String,                 | The change of the value of the portfolio                                                            |
| yearWorst             | Date as String,                   | The year itself                                                                                     |
| growthRateWorst       | number as String                  | The growth rate of the portfolio value in this year                                                 |
|                       | }                                 |                                                                                                     |
| finalPortfolioBalance | number as String,                 | The final portfolio balance (if < 0 => equal ot 0)                                                  |
| CAGR                  | number                            | Compund Annual Growth Rate of the portfolio                                                         |
| standardDeviation     | number                            | Standard Deviation                                                                                  |
| sharpeRatio           | number                            | Sharpe Ratio                                                                                        |

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

Performs backtesting, portfolio evaluation and analysis.

## npm run pythonTest

Spawns a child python process and prints out what it returns
