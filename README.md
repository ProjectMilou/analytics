# analytics

## Parameters with examples and explanations

#### stocksData

-   This parameter represents the Time Series Data fetched from **AlphaVantage** for all the stocks which are present in a given portfolio.
-   It is prefered to have the **DAILIY** Time Series, but Weekly and Monthly is also okay. It won't break the code.
-   The data is formed in the following way:

```javascript
{
  SYMBOL: {
      DATE: {
        "1. open": number,
        "2. high": number,
        "3. low": number,
        "4. close": number,
        "5. volume": number
      }
  }
}
```

###### Example for stocks data

```javascript
{
  AAPL: {
    '2017-01-27': {
      '1. open': '120.0000',
      '2. high': '122.4400',
      '3. low': '119.5000',
      '4. close': '121.9500',
      '5. volume': '124748449'
    },
    .
    .
    .
  },
  .
  .
  .,
  JPM: {
    '2017-01-27': {
      '1. open': '83.3000',
      '2. high': '86.9800',
      '3. low': '83.2050',
      '4. close': '86.9300',
      '5. volume': '73396847'
    },
    .
    .
    .
  }
}
```

#### symbolCompanyOverview

-   This parameter represents the Company Overview data fetched from **AlphaVantage** for all the stocks which are present in a given portfolio.
-   The data is formed in the following way:

```javascript
{
  SYMBOL: {
      Symbol: string,
      AssetType: string,
      ...
  }
}
```

###### Example for symbolCompanyOverview

```javascript
{
 BABA: {
    Symbol: 'BABA',
    AssetType: 'Common Stock',
    Exchange: 'NYSE',
    Currency: 'USD',
    Country: 'USA',
    Sector: 'Consumer Cyclical',
    Industry: 'Internet Retail',
    ...,
    LastSplitFactor: 'None',
    LastSplitDate: 'None'
  },
  JPM: {
    Symbol: 'JPM',
    AssetType: 'Common Stock',
    ...,
    LastSplitDate: '2000-06-12'
  }
}

```

#### balanceSheetPerSymbol

-   This parameter represents the Balance Sheet data fetched from **AlphaVantage** for all the stocks which are present in a given portfolio.
-   The data is formed in the following way:

```javascript
{
  SYMBOL: {
      symbol: string,
      annualReports: [object],
      quarterlyReports: [object]
  }
}
```

###### Example for balanceSheetPerSymbol

```javascript
{
  AAPL: {
    symbol: 'AAPL',
    annualReports: [Object1, ...ObjectN ],
    quarterlyReports: [Object1, ...ObjectN]
  },
  ...,
  GOOGL: {
    symbol: 'GOOGL',
    annualReports: [ Object1, ...ObjectN ],
    quarterlyReports: [ Object1, ...ObjectN ]
  },
}
```

## Backtesting

Testing the performance of a portfolio over a historical time span

#### Inputs:

| Parameters | Type                                                                                     |
| ---------- | ---------------------------------------------------------------------------------------- |
| portfolio  | A real or simulated portfolio in the form it is fetched from FinApi                      |
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
| finalPortfolioBalance | number as String,                 | The final portfolio balance (if < 0 => equal to 0)                                                  |
| CAGR                  | number                            | Compound Annual Growth Rate of the portfolio                                                        |
| standardDeviation     | number                            | Standard Deviation of the portfolio                                                                 |
| sharpeRatio           | number                            | Sharpe Ratio of the portfolio                                                                       |

#### Example output:

```javascript
{
  fromDate: 2017-01-01T00:00:00.000Z,
  toDate: 2021-04-03T08:57:28.391Z,
  MDDMaxToMin: '-0.5293',
  MDDInitialToMin: '-0.0056',
  dateMax: '2020-08-28',
  dateMin: '2017-01-20',
  maxValue: '34841.2200',
  minValue: '16400.8600',
  initialValue: '16493.1500',
  bestYear: {
    changeBest: '8311.4400',
    yearBest: '2019',
    growthRateBest: '0.4028'
  },
  worstYear: {
    changeWorst: '-1908.7500',
    yearWorst: '2018',
    growthRateWorst: '-0.0867'
  },
  finalPortfolioBalance: 31958.44,
  CAGR: 0.16938406656595228,
  standardDeviation: 0.032812673349866026,
  sharpeRatio: 0.2787391748259358
}

```

## Diversification of a Portfolio among criterion

Evaluates the portfolio diversification in:

-   industries
-   countries
-   currencies
-   asset classes
-   sectors

#### Inputs:

| Parameters            | Type                                                                      |
| --------------------- | ------------------------------------------------------------------------- |
| portfolio             | A real or simulated portfolio in the form it is fetched from FinApi       |
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
    'Banks-Diversified': 0.6504065040650407,
    'Consumer Electronics': 0.1626016260162602,
    'Information Technology Services': 0.0813008130081301,
    'Internet Retail': 0.07317073170731708,
    'Internet Content & Information': 0.032520325203252036
  },
  countries: { USA: 1 },
  currencies: { USD: 1 },
  assetClasses: { 'Common Stock': 1 },
  sectors: {
    'Financial Services': 0.6504065040650407,
    Technology: 0.2439024390243903,
    'Consumer Cyclical': 0.07317073170731708,
    'Communication Services': 0.032520325203252036
  }
}



```

## Price Earning Ratios

#### Inputs:

| Parameters            | Type                                                                      |
| --------------------- | ------------------------------------------------------------------------- |
| portfolio             | A real or simulated portfolio in the form it is fetched from FinApi       |
| symbolCompanyOverview | Company Overviews in the form of {symbol: data fetched from AlphaVantage} |

#### Outputs:

| Parameters            | Type   | Explanation                               |
| --------------------- | ------ | ----------------------------------------- |
| PERatios              | {      |
| concrete stock symbol | number | Price-Earning ratio of each of the stocks |
|                       | }      |
| averagePERatios       | number | Weighted average Price-Earning ratio      |

#### Example output:

```javascript
{
  peRation: {
    AAPL: '33.4662',
    GOOGL: '34.6457',
    AMZN: '74.3694',
    IBM: '20.945',
    BABA: '25.4694',
    JPM: '17.0011'
  },
  averagePEration: 21.98755609756098
}

```

## Dividends

#### Inputs:

| Parameters            | Type                                                                      |
| --------------------- | ------------------------------------------------------------------------- |
| portfolio             | A real or simulated portfolio in the form it is fetched from FinApi       |
| symbolCompanyOverview | Company Overviews in the form of {symbol: data fetched from AlphaVantage} |

#### Outputs:

| Parameters            | Type   | Explanation                         |
| --------------------- | ------ | ----------------------------------- |
| dividendyield         | {      |
| concrete stock symbol | number | Dividendyield of each of the stocks |
|                       | }      |
| averageDividendyield  | number | Weighted average Dividendyield      |

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
  averageDividendyield: 0.020284552845528457
}

```

## Gain/Loss:

#### Inputs:

| Parameters | Type                                                                                     |
| ---------- | ---------------------------------------------------------------------------------------- |
| portfolio  | A real or simulated portfolio in the form it is fetched from FinApi                      |
| stocksData | Daily/Weekly/Monthly Time Series in the from of {symbol: data fetched from AlphaVantage} |

#### Outputs:

| Parameters            | Type   | Explanation                                                    |
| --------------------- | ------ | -------------------------------------------------------------- |
| totalGainLoss         | number | Positive numbers represent Gains and negative numbers - Losses |
| concrete stock symbol | {      |                                                                |
| symbolGainLoss        | number | Positive numbers represent Gains and negative numbers - Losses |
|                       | }      |                                                                |

#### Example output:

```javascript
{
  totalGainLoss: 2726.7100000000028,
  perSymbol: {
    AAPL: -226,
    GOOGL: 1172.5999999999995,
    AMZN: -362.39999999999964,
    IBM: 99.80000000000018,
    BABA: -6.089999999999918,
    JPM: 2048.800000000003
  }
}

```

## Standard Deviation, Volatility and Correlation:

#### Inputs:

| Parameters | Type                                                                                     |
| ---------- | ---------------------------------------------------------------------------------------- |
| portfolio  | A real or simulated portfolio in the form it is fetched from FinApi                      |
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
| portfolioVolatility   | number |
| standardDeviation     | number |

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
  },
  portfolioVolatility: 0.5208850412096532,
  standardDeviation: 0.032812673349866026
}


```

## Sharpe ratio:

#### Inputs:

| Parameters | Type                                                                                     |
| ---------- | ---------------------------------------------------------------------------------------- |
| portfolio  | A real or simulated portfolio in the form it is fetched from FinApi                      |
| stocksData | Daily/Weekly/Monthly Time Series in the from of {symbol: data fetched from AlphaVantage} |

#### Outputs:

| Parameters            | Type   |
| --------------------- | ------ |
| sharpeRatioPerSymbol  | {      |
| concrete stock symbol | number |
|                       | }      |
| portfolioSharpeRatio  | number |

Again this should also be shown on a portfolio level

#### Example output:

```javascript
{
  sharpeRatioPerSymbol: {
    Apple: -0.01677788742875957,
    Google: 0.3918344052565828,
    Amazon: 0.5882535062884182,
    IBM: -0.1304550726559575,
    'Alibaba group': 0.30004682245527253,
    'JPMorgan Chase & Co.': 0.18631715927443418
  },
  portfolioSharpeRatio: 0.2787391748259358
}

```

## Debt/Equity:

#### Inputs:

| Parameters            | Type                                                                   |
| --------------------- | ---------------------------------------------------------------------- |
| portfolio             | A real or simulated portfolio in the form it is fetched from FinApi    |
| balanceSheetPerSymbol | Balance Sheets in the form of {symbol: data fetched from AlphaVantage} |

#### Outputs:

| Parameters            | Type   | Explanation                                      |
| --------------------- | ------ | ------------------------------------------------ |
| debtEquityPerStock    | {      |                                                  |
| concrete stock symbol | number | Represents the Debt/Equity of each of the stocks |
|                       | }      |                                                  |
| averageDebtEquity     | number | Weighted average Debt/Equity of the portfolio    |

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
  averageDebtEquity: 8.48989362900556
}

```

## npm start

Performs backtesting, portfolio evaluation and analysis.

## npm run pythonTest

Spawns a child python process and prints out what it returns
