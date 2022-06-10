/* eslint-disable no-console */
/** This module implements a price-time matching engine for a centralize limit
 * order book (CLOB).
 */

import { Order } from "./types/order";
import { OrderInput } from "./types/order-input";
import { Logger } from "./util/logger";
import { idFactory } from "./util/id-factory";
import { AggregatedBook } from "./types/aggregated-book";
import { timestampFactory } from "./util/timestamp-factory";
import { Trade } from "./types/trade";
import { NotYetImplementedError } from "./util/not-yet-implemented-error";
import { PriceLevel } from "./types/price-level-schema";

/** Single-ticket CLOB order book and trade execution engine */
export class Clob {
  private readonly logger = new Logger(Clob.name);

  expectedBook: AggregatedBook = {
    asks: [],
    bids: [],
  };

  buyOrders = new Map();

  sellOrders = new Map();

  uniqueOrders = new Map();

  public constructor() {
    this.logger.debug("Instantiating");
  }

  /** Aggregate open orders into publicly-available price levels */
  getAggregatedBook(): AggregatedBook {
    this.logger.debug("Getting aggregated book");
    return this.expectedBook;
  }

  /** Handle an order request placed by a trader
   * @param input Order event
   * @returns The newly-created ClobOrder
   */
  createOneOrder(input: OrderInput): Order {
    const id = idFactory();
    this.logger.debug(
      `Matching order for trader=${input.trader} with id=${id}`,
    );
    const _order: Order = {
      createdAt: timestampFactory(),
      id,
      price: input.price,
      quantity: input.quantity,
      quantityRemaining: input.quantity,
      side: input.side,
      trader: input.trader,
      tradeIds: [id],
    };

    if (input.side === "BUY") {
      // update aggregatedBook
      const foundIndex = this.expectedBook.bids.findIndex(
        (x) => x.price === input.price,
      );
      if (foundIndex !== -1) {
        this.expectedBook.bids[foundIndex].quantity += input.quantity;
      } else {
        const _bid: PriceLevel = {
          price: input.price,
          quantity: input.quantity,
        };
        this.expectedBook.bids.push(_bid);
      }

      if (this.sellOrders.has(input.price)) {
        if (this.sellOrders.get(input.price).length > 0) {
          _order.quantityRemaining = 0;
          const maker = this.sellOrders.get(input.price)[0];
          maker.quantityRemaining = 0;
          this.sellOrders.get(input.price).shift();
          this.sellOrders.get(input.price).unshift(maker);
          this.uniqueOrders.set(maker.id, maker);
        }
      }
      this.uniqueOrders.has(_order.id) ? this.uniqueOrders.get(_order.id).push(_order) : this.uniqueOrders.set(_order.id, [_order]);
      this.buyOrders.has(_order.id) ? this.buyOrders.get(_order.id).push(_order) : this.buyOrders.set(_order.id, [_order]);
    } else {
      const foundIndex = this.expectedBook.asks.findIndex(
        (x) => x.price === input.price,
      );
      if (foundIndex !== -1) {
        this.expectedBook.asks[foundIndex].quantity += input.quantity;
      } else {
        const _ask: PriceLevel = {
          price: input.price,
          quantity: input.quantity,
        };
        this.expectedBook.bids.push(_ask);
      }

      if (this.buyOrders.has(input.price)) {
        if (this.buyOrders.get(input.price).length > 0) {
          _order.quantityRemaining = 0;
          const maker = this.buyOrders.get(input.price)[0];
          maker.quantityRemaining = 0;
          this.buyOrders.get(input.price).shift();
          this.buyOrders.get(input.price).unshift(maker);
          this.uniqueOrders.set(maker.id, maker);
        }
      }
      this.uniqueOrders.has(_order.id) ? this.uniqueOrders.get(_order.id).push(_order) : this.uniqueOrders.set(_order.id, [_order]);
      this.sellOrders.has(_order.id) ? this.sellOrders.get(_order.id).push(_order) : this.sellOrders.set(_order.id, [_order]);
    }
    return _order;
  }

  /** Load an order by its id */
  getOneOrder(orderId: string): Order {
    this.logger.debug(`Loading order with id=${orderId}`);
    return this.uniqueOrders.get(orderId);
  }

  /** Load a trade by its id */
  getOneTrade(tradeId: string): Trade {
    this.logger.debug(`Loading trade with id=${tradeId}`);
    throw new NotYetImplementedError();
  }
}
