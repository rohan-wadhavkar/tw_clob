/* eslint-disable no-plusplus */
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
// import { NotYetImplementedError } from "./util/not-yet-implemented-error";
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

  uniqueTrades = new Map();

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
      tradeIds: [],
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
      for (const key of this.sellOrders.keys()) {
        if (key === input.price - 1 || _order.quantityRemaining === 0) break;
        for (let i = 0; i < this.sellOrders.get(key).length; i++) {
          const makerId = this.sellOrders.get(key)[i];
          const makerOrder = this.getOneOrder(makerId);
          if (_order.trader === makerOrder.trader) continue;
          _order.quantityRemaining -= makerOrder.quantityRemaining;
          if (_order.quantityRemaining < 0) _order.quantityRemaining = 0;

          const tempOrderQuantityRemaining = _order.quantityRemaining;
          _order.quantityRemaining -= makerOrder.quantityRemaining;
          if (_order.quantityRemaining < 0) _order.quantityRemaining = 0;

          makerOrder.quantityRemaining -= tempOrderQuantityRemaining;
          if (makerOrder.quantityRemaining < 0)
            makerOrder.quantityRemaining = 0;
          if (makerOrder.quantityRemaining === 0)
            this.buyOrders.get(key).shift();

          this.uniqueOrders.set(makerId, makerOrder);
          this.uniqueOrders.set(_order.id, _order);
          const _tradeQuantity =
            _order.quantityRemaining === 0
              ? _order.quantity
              : _order.quantity - _order.quantityRemaining;
          this.createNewTrade(
            makerOrder.price,
            _tradeQuantity,
            _order.id,
            makerId,
          );
          if (_order.quantityRemaining === 0) break;
        }
      }

      if (_order.quantityRemaining !== 0) {
        if (this.buyOrders.has(_order.price)) {
          this.buyOrders.get(_order.price).push(_order.id);
        } else {
          this.buyOrders.set(_order.price, [_order.id]);
          this.buyOrders = new Map(
            [...this.buyOrders].sort((a, b) => b[0] - a[0]),
          );
        }
      }
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

      let highestBuyTooLow = false;
      for (const key of this.buyOrders.keys()) {
        if (highestBuyTooLow || _order.quantityRemaining === 0) break;

        for (let i = 0; i < this.buyOrders.get(key).length; i++) {
          const makerId = this.buyOrders.get(key)[i];
          const makerOrder = this.getOneOrder(makerId);
          if (_order.trader === makerOrder.trader) continue;
          if (makerOrder.price < _order.price) {
            highestBuyTooLow = true;
            break;
          }

          const tempOrderQuantityRemaining = _order.quantityRemaining;

          _order.quantityRemaining -= makerOrder.quantityRemaining;
          if (_order.quantityRemaining < 0) _order.quantityRemaining = 0;

          makerOrder.quantityRemaining -= tempOrderQuantityRemaining;
          if (makerOrder.quantityRemaining < 0)
            makerOrder.quantityRemaining = 0;
          if (makerOrder.quantityRemaining === 0)
            this.buyOrders.get(key).shift();

          this.uniqueOrders.set(makerId, makerOrder);
          this.uniqueOrders.set(_order.id, _order);
          const _tradeQuantity =
            _order.quantityRemaining === 0
              ? _order.quantity
              : _order.quantity - _order.quantityRemaining;
          this.createNewTrade(
            makerOrder.price,
            _tradeQuantity,
            makerId,
            _order.id,
          );
          if (_order.quantityRemaining === 0) break;
        }
      }

      if (_order.quantityRemaining !== 0) {
        if (this.sellOrders.has(_order.price)) {
          this.sellOrders.get(_order.price).push(_order.id);
        } else {
          this.sellOrders.set(_order.price, [_order.id]);
          this.sellOrders = new Map(
            [...this.sellOrders].sort((a, b) => a[0] - b[0]),
          );
        }
      }
    }
    this.uniqueOrders.set(_order.id, _order);
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
    return this.uniqueTrades.get(tradeId);
  }

  createNewTrade(
    price: number,
    quantity: number,
    buyOrderId: string,
    sellOrderId: string,
  ): void {
    const _uniqueTradeId = this.uniqueTrades.size + 1;
    const _trade: Trade = {
      price,
      quantity,
      id: _uniqueTradeId,
      buyOrderId,
      sellOrderId,
    };
    const _updateBuyOrder = this.uniqueOrders.get(buyOrderId);
    const _updateSellOrder = this.uniqueOrders.get(sellOrderId);
    _updateBuyOrder.tradeIds.push(_uniqueTradeId);
    _updateSellOrder.tradeIds.push(_uniqueTradeId);

    this.uniqueTrades.set(_uniqueTradeId, _trade);
  }
}
