import { Clob } from "../clob";
import { OrderInput } from "../types/order-input";
import { SIDE_BUY, SIDE_SELL } from "../types/side";

describe(`${Clob.name}#${Clob.prototype.createOneOrder.name}`, () => {
  it("returns a CLOB order with a generated createdAt, id and price, quantity, side, trader copied from the input", () => {
    const input: OrderInput = {
      side: SIDE_BUY,
      price: 100,
      quantity: 100,
      trader: "buyer",
    };
    const order = new Clob().createOneOrder(input);
    expect(order.id).toBeTruthy();
    expect(order.createdAt).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d+Z$/,
    );
    expect(order.price).toBe(input.price);
    expect(order.quantity).toBe(input.quantity);
    expect(order.side).toBe(input.side);
    expect(order.trader).toBe(input.trader);
  });

  it.skip(`executes a trade at the order price and quantity if the order prices
            and quantities are the same, dynamically updating (mutating) the returned order`, () => {
    const clob = new Clob();
    const price = 100;
    const quantity = 100;

    const buyOrder = clob.createOneOrder({
      side: SIDE_BUY,
      price,
      quantity,
      trader: "buyer",
    });

    const sellOrder = clob.createOneOrder({
      side: SIDE_SELL,
      price,
      quantity,
      trader: "seller",
    });
    // The following line implicitly requires that the object returned by
    // clob.createOneOrder dynamically updates (mutates) as trades are executed
    // on it later
    expect(buyOrder.tradeIds.length).toBe(1);
    expect(buyOrder.quantityRemaining).toBe(0);
    expect(sellOrder.tradeIds.length).toBe(1);
    expect(sellOrder.quantityRemaining).toBe(0);
    const tradeId = sellOrder.tradeIds[0];
    const trade = clob.getOneTrade(tradeId);
    expect(trade.quantity).toBe(quantity);
    expect(trade.price).toBe(price);
    expect(trade.buyOrderId).toBe(buyOrder.id);
    expect(trade.sellOrderId).toBe(sellOrder.id);
  });

  it.skip("executes a trade at the maker price if the order prices are different but overlapping", () => {
    const clob = new Clob();
    const price = 100;
    const quantity = 225;
    const buyOrder = clob.createOneOrder({
      side: SIDE_BUY,
      price,
      quantity,
      trader: "buyer",
    });
    const sellOrder = clob.createOneOrder({
      side: SIDE_SELL,
      price: price - 10,
      quantity,
      trader: "seller",
    });
    expect(sellOrder.tradeIds.length).toBe(1);
    const trade = clob.getOneTrade(sellOrder.tradeIds[0]);
    expect(trade.price).toBe(buyOrder.price);
  });

  it.skip("does not execute trades if there is no overlap in price", () => {
    const clob = new Clob();
    const buyOrder = clob.createOneOrder({
      side: SIDE_BUY,
      price: 80,
      quantity: 100,
      trader: "buyer",
    });
    const sellOrder = clob.createOneOrder({
      side: SIDE_SELL,
      price: 100,
      quantity: 200,
      trader: "seller",
    });
    expect(sellOrder.tradeIds.length).toBe(0);
    expect(sellOrder.quantityRemaining).toBe(sellOrder.quantity);
    expect(buyOrder.tradeIds.length).toBe(0);
    expect(buyOrder.quantityRemaining).toBe(buyOrder.quantity);
  });

  it.skip("executes a trade for a partial quantity if the order quantities are different", () => {
    const clob = new Clob();
    const sellOrderExcessQuantity = 25;
    const price = 100;
    const quantity = 225;
    const buyOrder = clob.createOneOrder({
      side: SIDE_BUY,
      price,
      quantity,
      trader: "buyer",
    });
    const sellOrder = clob.createOneOrder({
      side: SIDE_SELL,
      price,
      quantity: quantity + sellOrderExcessQuantity,
      trader: "seller",
    });
    expect(buyOrder.quantityRemaining).toBe(0);
    expect(sellOrder.quantityRemaining).toBe(sellOrderExcessQuantity);
    expect(sellOrder.tradeIds.length).toBe(1);
    const tradeId = sellOrder.tradeIds[0];
    const trade = clob.getOneTrade(tradeId);
    expect(trade.quantity).toBe(quantity);
  });

  it.skip("does not match orders from a trader with their own orders", () => {
    const clob = new Clob();
    const price = 100;
    const quantity = 225;
    const trader = "traderX";
    const buyOrder = clob.createOneOrder({
      side: SIDE_BUY,
      price,
      quantity,
      trader,
    });
    const sellOrder = clob.createOneOrder({
      side: SIDE_SELL,
      price,
      quantity,
      trader,
    });
    expect(buyOrder.quantityRemaining).toBe(quantity);
    expect(sellOrder.quantityRemaining).toBe(quantity);
  });

  it.skip("executes trades for the oldest order first at a price level", () => {
    const clob = new Clob();
    const price = 100;
    const quantity = 100;
    const buyOrder0 = clob.createOneOrder({
      side: SIDE_BUY,
      price,
      quantity,
      trader: "buyer0",
    });

    const buyOrder1 = clob.createOneOrder({
      side: SIDE_BUY,
      price,
      quantity,
      trader: "buyer1",
    });

    clob.createOneOrder({
      side: SIDE_SELL,
      price,
      quantity,
      trader: "seller",
    });

    expect(buyOrder0.quantityRemaining).toBe(0);
    expect(buyOrder1.quantityRemaining).toBe(quantity);
  });

  it.skip("allows a single large order to 'sweep the book'", () => {
    const clob = new Clob();
    const price = 100;
    const quantity = 100;
    const buyOrder0 = clob.createOneOrder({
      side: SIDE_BUY,
      price: price + 10,
      quantity,
      trader: "buyer0",
    });

    const buyOrder1 = clob.createOneOrder({
      side: SIDE_BUY,
      price: price + 20,
      quantity,
      trader: "buyer1",
    });

    const sellOrder = clob.createOneOrder({
      side: SIDE_SELL,
      price,
      quantity: buyOrder0.quantity + buyOrder1.quantity + 100,
      trader: "seller",
    });

    expect(buyOrder0.quantityRemaining).toBe(0);
    expect(buyOrder1.quantityRemaining).toBe(0);
    expect(sellOrder.quantityRemaining).toBe(
      sellOrder.quantity - buyOrder0.quantity - buyOrder1.quantity,
    );
  });
});
