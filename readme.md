In this exercise, we'd like for you to demonstrate your capability as a software engineer by building a central limit order book (CLOB) with TypeScript and Node.js starting from this stub project.

## Background 

A CLOB is a trading system that matches customer limit orders based on "price-time priority". A [limit order](https://www.sec.gov/fast-answers/answerslimithtm.html) is an order to buy or sell a number of shares of a stock (or an amount of cryptocurrency or as is often the case in Tradeweb markets a number of bonds) for specific price or better. A buy order is sometimes called a bid, "I'm willing to buy as many as 100 shares of TW and I'm willing to pay as much as $100 for each share". A sell order is sometimes called an ask, "I'm willing to sell as many as 500 shares of TW and I'm asking to be paid at least $120 per share". "Offer" is another synonym for sell order as in, "I'll offer you $100 to sell your share to me".

Limit orders are not guaranteed to be executed as trades. In the examples above, there's no match because the buyer is bidding $100 but the seller is asking $120. When an order has been fully executed as trades, we say it has been "filled".

The [order book](https://en.wikipedia.org/wiki/Order_book) is a list of all the open buy orders and all the open sell orders on the exchange. When a sell order is placed at a price (e.g. $80) that's lower than the highest bid (e.g. $100), trades are executed starting at highest bid. Similarly when a buy order is placed at a price that's higher than the lowest ask, trades are executed starting at the lowest ask.

The two counterparties in a trade are sometimes referred to as the "maker" and the "taker". The maker (short for "market maker") is the one whose order was in the book. The taker is the one who came in later with a matching price.

When several orders specify the same price and side, they are referred to as a "price level". Within a price level, the oldest order should be executed first. That's the "time" in price-time priority.

## Your task

In this exercise, you'll implement a simple in-memory single-ticker CLOB starting from this stub project. Here are its main components:

- [**src/clob.ts**](src/clob.ts): Class implementing the order book and matching engine. This is where you'll do the majority of your work. The stub methods in this class currently throw [`NotYetImplementedError`s](src/util/not-yet-implemented-error.ts). These are the "todo"s for your implementation.
- [**src/__tests__/clob-create-one-order.test.ts**](src/__tests__/clob-create-one-order.test.ts): Unit tests defining the expected behavior of the `Clob` method `createOneOrder`. These unit tests are currently skipped in `npm run unit-test`. As you implement `Clob`, you should enable these tests by removing the `skip` in `it.skip`.
- [**src/__tests__/clob-get-aggregated-book.test.ts**](src/__tests__/clob-get-aggregated-book.test.ts): Unit tests defining the expected behavior of the `Clob` method `getAggregatedBook`. These unit tests are currently skipped in `npm run unit-test`. As you implement `Clob`, you should enable these tests by removing the `skip` in `it.skip`.
- [**src/types**](src/types/): TypeScript types for `Order`, `Trade` etc. declared as [Zod](https://github.com/colinhacks/zod/blob/master/README.md) schemas with runtime validation.
- [**src/util**](src/util/): Shared utilities

## Developer setup

As a first step, please create a repository in your personal GitHub (if you do not have a GitHub account, you will need to create a free one for the purposes of this exercise) and push this project to that repository. *Please set your repository to private.* Then, please invite the following individuals as collaborators to this repository:

- Bhavin Shah (bhavinshah0916)
- Chris Arnesen (carnesen)
- Kirtan Patel (kirtanp98)
- Matthew Lane (lanemt)
- Matthias Jenny (m1010j)
- Michael Lazebnik (mlazebnik)
- Vaibhav Saharan (vsaharan)

We recommend that you regularly push your work to this repository as you make progress over the allotted time period. Don't be afraid to push incomplete work. You will only be judged on the final version of the code as it stands after the allotted time is up.

To set up this project for local development, you'll need to [install Node.js](https://nodejs.org/en/) if you haven't already. We use Node.js v16, but later versions will probably work fine too. Now in a terminal `cd` into this directory and do:

```
npm ci
```

This installs the project's dependencies. Now do:

```
npm test
```

This lints the source code using [ESLint](https://eslint.org/), runs the unit tests using [Jest](https://jestjs.io/), and finally compiles the TypeScript code into the [lib](lib) directory.

To run the unit tests in "watch" mode do:

```
npm run unit-test:watch
```

## Evaluation criteria

- Progress: First and foremost, we want to see how many of the unit tests you can get to work in the time allotted. Focus on writing working code.

- Code quality: Working code is good, but working code that's easy to read and understand is even better. How legible is your code? Are we able to follow control flow? Are you using appropriate patterns to implement your solution?

- Performance: Your solution need not be optimized for performance, but you should be able to speak to its performance characteristics. How might you do things differently if it had to handle thousands of orders per second?

## Frequently asked questions

Q: When the price of the matched orders are different what should the trade price be? 

A: The execution price could be the buy price (e.g. $100), the sell price (e.g. $80), or something in between. For the purpose of this exercise, when there's a match let's execute the trade at the "maker" price, i.e. the price of the order that was in the book when the other order arrived.

## Copyright

Copyright © 2022 Tradeweb Markets LLC. All rights reserved.
