import { Clob } from "../clob";
import { AggregatedBook } from "../types/aggregated-book";
import { OrderInput } from "../types/order-input";
import { SIDE_BUY } from "../types/side";

describe(`${Clob.name}#${Clob.prototype.getAggregatedBook.name}`, () => {
  it("aggregates all the orders into price levels", () => {
    const clob = new Clob();
    const price = 100;
    const quantity = 225;
    const input: OrderInput = {
      side: SIDE_BUY,
      price,
      quantity,
      trader: "buyer",
    };

    // Add the order twice
    clob.createOneOrder(input);
    clob.createOneOrder(input);

    const expectedBook: AggregatedBook = {
      asks: [],
      bids: [{ price, quantity: quantity + quantity }],
    };
    expect(clob.getAggregatedBook()).toEqual(expectedBook);
  });
});
