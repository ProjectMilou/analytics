# analytics

## Backtesting

Testing the performance of a portfolio over a historical time span

#### Inputs:

| Parameters | Type                                                                                     |
| ---------- | ---------------------------------------------------------------------------------------- |
| portfolio  | The exact same portfolio, which can be fetched from the finApi                           |
| stocksData | Daily/Weekly/Monthly Time Series in the from of {symbol: data fetched from AlphaVantage} |
| fromDate   | Date                                                                                     |
| toDate     | Date                                                                                     |

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

## Diversification of a Portfolio among criterion

Evaluates the portfolio diversification in:
_ industries
_ countries
_ currencies
_ asset classes \* sectors

#### Inputs:

| Parameters            | Type                                                                      |
| --------------------- | ------------------------------------------------------------------------- |
| portfolio             | The exact same portfolio, which can be fetched from the finApi            |
| symbolCompanyOverview | Company Overviews in the form of {symbol: data fetched from AlphaVantage} |

#### Outputs:

| Parameters           | Type   |
| -------------------- | ------ |
| industries           | {      |
| concrete industry    | number |
|                      | }      |
| countries            | {      |
| concrete country     | number |
|                      | }      |
| currencies           | {      |
| concrete currency    | number |
|                      | }      |
| assetClasses         | {      |
| concrete asset class | number |
|                      | }      |
| sectors              | {      |
| concrete sector      | number |
|                      | }      |

#### Example output:

```javascript
{
  industries: {
    'Consumer Electronics': 0.09523809523809523,
    'Internet Content & Information': 0.19047619047619047,
    'Internet Retail': 0.19047619047619047,
    'Information Technology Services': 0.14285714285714285,
    'Banks-Diversified': 0.38095238095238093
  },
  countries: { USA: 0.9999999999999999 },
  currencies: { USD: 0.9999999999999999 },
  assetClasses: { 'Common Stock': 0.9999999999999999 },
  sectors: {
    Technology: 0.23809523809523808,
    'Communication Services': 0.19047619047619047,
    'Consumer Cyclical': 0.19047619047619047,
    'Financial Services': 0.38095238095238093
  }
}
```

## Price Earning Ratios

#### Inputs:

| Parameters            | Type                                                                      |
| --------------------- | ------------------------------------------------------------------------- |
| portfolio             | The exact same portfolio, which can be fetched from the finApi            |
| symbolCompanyOverview | Company Overviews in the form of {symbol: data fetched from AlphaVantage} |

#### Outputs:

| Parameters            | Type   |
| --------------------- | ------ |
| PERatios              | {      |
| concrete stock symbol | number |
|                       | }      |
| averagePERatios       | number |

#### Example output:

```javascript
{
  PERatios: {
    AAPL: '33.4662',
    GOOGL: '34.6457',
    AMZN: '74.3694',
    IBM: '20.945',
    BABA: '25.4694',
    JPM: '17.0011'
  },
  averagePEration: 28.763647619047617
}
```

## Dividends

#### Inputs:

| Parameters            | Type                                                                      |
| --------------------- | ------------------------------------------------------------------------- |
| portfolio             | The exact same portfolio, which can be fetched from the finApi            |
| symbolCompanyOverview | Company Overviews in the form of {symbol: data fetched from AlphaVantage} |

#### Outputs:

| Parameters            | Type   |
| --------------------- | ------ |
| dividendyield         | {      |
| concrete stock symbol | number |
|                       | }      |
| averageDividendyield  | number |

#### Example output:

```javascript
{
  dividendyield: {
    AAPL: 0.0067,
    GOOGL: 0,
    AMZN: 0,
    IBM: 0.0505,
    BABA: 0,
    JPM: 0.0232
  },
  averageDividendyield: 0.01669047619047619
}

```

## Gain/Loss:

#### Inputs:

| Parameters | Type                                                                                     |
| ---------- | ---------------------------------------------------------------------------------------- |
| portfolio  | The exact same portfolio, which can be fetched from the finApi                           |
| stocksData | Daily/Weekly/Monthly Time Series in the from of {symbol: data fetched from AlphaVantage} |

#### Outputs:

| Parameters            | Type   |
| --------------------- | ------ |
| totalGainLoss         | number |
| concrete stock symbol | {      |
| symbolGainLoss        | number |
|                       | }      |

#### Example output:

```javascript
{
  totalGainLoss: 1020.6800000000001,
  AAPL: { symbolGainLoss: -22.599999999999994 },
  GOOGL: { symbolGainLoss: 1172.5999999999995 },
  AMZN: { symbolGainLoss: -362.39999999999964 },
  IBM: { symbolGainLoss: 29.940000000000055 },
  BABA: { symbolGainLoss: -1.7399999999999523 },
  JPM: { symbolGainLoss: 204.8800000000001 }
}
```

## Volatility and Correlation:

#### Inputs:

| Parameters | Type                                                                                     |
| ---------- | ---------------------------------------------------------------------------------------- |
| portfolio  | The exact same portfolio, which can be fetched from the finApi                           |
| stocksData | Daily/Weekly/Monthly Time Series in the from of {symbol: data fetched from AlphaVantage} |

#### Outputs:

| Parameters            | Type   |
| --------------------- | ------ |
| volatility            | {      |
| concrete stock symbol | number |
|                       | }      |
| correlations          | {      |
| concrete correlation  | number |
|                       | }      |

#### Example output:

```javascript
{
  volatility: {
    Apple: 1.0304461557501514,
    Google: 0.5496680733681532,
    Amazon: 0.5993856976545141,
    IBM: 0.5765889119578946,
    'Alibaba group': 0.7140162113218156,
    'JPMorgan Chase & Co.': 0.6486754881067324
  },
  correlations: {
    'Apple to Google': 0.397373186,
    'Amazon to Apple': 0.352196405,
    'Amazon to Google': 0.57879282,
    'Apple to IBM': 0.274291102,
    'Google to IBM': 0.404049364,
    'Amazon to IBM': 0.293267182,
    'Alibaba group to Apple': 0.265261281,
    'Alibaba group to Google': 0.484715212,
    'Alibaba group to Amazon': 0.489600363,
    'Alibaba group to IBM': 0.296927759,
    'Apple to JPMorgan Chase & Co.': 0.223081253,
    'Google to JPMorgan Chase & Co.': 0.502319427,
    'Amazon to JPMorgan Chase & Co.': 0.223161337,
    'IBM to JPMorgan Chase & Co.': 0.609458275,
    'Alibaba group to JPMorgan Chase & Co.': 0.263935979
  }
}

```

## Sharpe ratio:

#### Inputs:

| Parameters | Type                                                                                     |
| ---------- | ---------------------------------------------------------------------------------------- |
| portfolio  | The exact same portfolio, which can be fetched from the finApi                           |
| stocksData | Daily/Weekly/Monthly Time Series in the from of {symbol: data fetched from AlphaVantage} |

#### Outputs:

| Parameters            | Type   |
| --------------------- | ------ |
| {                     |        |
| concrete stock symbol | number |
| }                     |        |

#### Example output:

```javascript
{
  Apple: -0.01677788742875957,
  Google: 0.3918344052565828,
  Amazon: 0.5882535062884182,
  IBM: -0.1304550726559575,
  'Alibaba group': 0.30004682245527253,
  'JPMorgan Chase & Co.': 0.18631715927443418
}
```

## Debt/Equity:

#### Inputs:

| Parameters            | Type                                                                   |
| --------------------- | ---------------------------------------------------------------------- |
| portfolio             | The exact same portfolio, which can be fetched from the finApi         |
| balanceSheetPerSymbol | Balance Sheets in the form of {symbol: data fetched from AlphaVantage} |

#### Outputs:

| Parameters            | Type   |
| --------------------- | ------ |
| debtEquityPerStock    | {      |
| concrete stock symbol | number |
|                       | }      |
| totalDebtEquity       | number |
| averageDebtEquity     | number |

#### Example output:

```javascript
{
  debtEquityPerStock: {
    AAPL: 3.957039440456695,
    GOOGL: 0.436192393414336,
    AMZN: 2.4387713588283155,
    IBM: 6.525015680030878,
    BABA: 0.5082281505442549,
    JPM: 11.121075767663967
  },
  totalDebtEquity: 24.986322790938445,
  averageDebtEquity: 4.164387131823074
}

```

## npm start

Performs backtesting, portfolio evaluation and analysis.

## npm run pythonTest

Spawns a child python process and prints out what it returns
