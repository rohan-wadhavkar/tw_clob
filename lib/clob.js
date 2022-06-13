"use strict";
/* eslint-disable no-plusplus */
/** This module implements a price-time matching engine for a centralize limit
 * order book (CLOB).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clob = void 0;
const logger_1 = require("./util/logger");
const id_factory_1 = require("./util/id-factory");
const timestamp_factory_1 = require("./util/timestamp-factory");
/** Single-ticket CLOB order book and trade execution engine */
class Clob {
    constructor() {
        Object.defineProperty(this, "logger", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new logger_1.Logger(Clob.name)
        });
        Object.defineProperty(this, "expectedBook", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                asks: [],
                bids: [],
            }
        });
        Object.defineProperty(this, "buyOrders", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "sellOrders", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "uniqueOrders", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "uniqueTrades", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        this.logger.debug("Instantiating");
    }
    /** Aggregate open orders into publicly-available price levels */
    getAggregatedBook() {
        this.logger.debug("Getting aggregated book");
        return this.expectedBook;
    }
    /** Handle an order request placed by a trader
     * @param input Order event
     * @returns The newly-created ClobOrder
     */
    createOneOrder(input) {
        const id = (0, id_factory_1.idFactory)();
        this.logger.debug(`Matching order for trader=${input.trader} with id=${id}`);
        const _order = {
            createdAt: (0, timestamp_factory_1.timestampFactory)(),
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
            const foundIndex = this.expectedBook.bids.findIndex((x) => x.price === input.price);
            if (foundIndex !== -1) {
                this.expectedBook.bids[foundIndex].quantity += input.quantity;
            }
            else {
                const _bid = {
                    price: input.price,
                    quantity: input.quantity,
                };
                this.expectedBook.bids.push(_bid);
            }
            for (const key of this.sellOrders.keys()) {
                if (key === input.price - 1 || _order.quantityRemaining === 0)
                    break;
                for (let i = 0; i < this.sellOrders.get(key).length; i++) {
                    const makerId = this.sellOrders.get(key)[i];
                    const makerOrder = this.getOneOrder(makerId);
                    if (_order.trader === makerOrder.trader)
                        continue;
                    _order.quantityRemaining -= makerOrder.quantityRemaining;
                    if (_order.quantityRemaining < 0)
                        _order.quantityRemaining = 0;
                    const tempOrderQuantityRemaining = _order.quantityRemaining;
                    _order.quantityRemaining -= makerOrder.quantityRemaining;
                    if (_order.quantityRemaining < 0)
                        _order.quantityRemaining = 0;
                    makerOrder.quantityRemaining -= tempOrderQuantityRemaining;
                    if (makerOrder.quantityRemaining < 0)
                        makerOrder.quantityRemaining = 0;
                    if (makerOrder.quantityRemaining === 0)
                        this.buyOrders.get(key).shift();
                    this.uniqueOrders.set(makerId, makerOrder);
                    this.uniqueOrders.set(_order.id, _order);
                    const _tradeQuantity = _order.quantityRemaining === 0
                        ? _order.quantity
                        : _order.quantity - _order.quantityRemaining;
                    this.createNewTrade(makerOrder.price, _tradeQuantity, _order.id, makerId);
                    if (_order.quantityRemaining === 0)
                        break;
                }
            }
            if (_order.quantityRemaining !== 0) {
                if (this.buyOrders.has(_order.price)) {
                    this.buyOrders.get(_order.price).push(_order.id);
                }
                else {
                    this.buyOrders.set(_order.price, [_order.id]);
                    this.buyOrders = new Map([...this.buyOrders].sort((a, b) => b[0] - a[0]));
                }
            }
        }
        else {
            const foundIndex = this.expectedBook.asks.findIndex((x) => x.price === input.price);
            if (foundIndex !== -1) {
                this.expectedBook.asks[foundIndex].quantity += input.quantity;
            }
            else {
                const _ask = {
                    price: input.price,
                    quantity: input.quantity,
                };
                this.expectedBook.bids.push(_ask);
            }
            let highestBuyTooLow = false;
            for (const key of this.buyOrders.keys()) {
                if (highestBuyTooLow || _order.quantityRemaining === 0)
                    break;
                for (let i = 0; i < this.buyOrders.get(key).length; i++) {
                    const makerId = this.buyOrders.get(key)[i];
                    const makerOrder = this.getOneOrder(makerId);
                    if (_order.trader === makerOrder.trader)
                        continue;
                    if (makerOrder.price < _order.price) {
                        highestBuyTooLow = true;
                        break;
                    }
                    const tempOrderQuantityRemaining = _order.quantityRemaining;
                    _order.quantityRemaining -= makerOrder.quantityRemaining;
                    if (_order.quantityRemaining < 0)
                        _order.quantityRemaining = 0;
                    makerOrder.quantityRemaining -= tempOrderQuantityRemaining;
                    if (makerOrder.quantityRemaining < 0)
                        makerOrder.quantityRemaining = 0;
                    if (makerOrder.quantityRemaining === 0)
                        this.buyOrders.get(key).shift();
                    this.uniqueOrders.set(makerId, makerOrder);
                    this.uniqueOrders.set(_order.id, _order);
                    const _tradeQuantity = _order.quantityRemaining === 0
                        ? _order.quantity
                        : _order.quantity - _order.quantityRemaining;
                    this.createNewTrade(makerOrder.price, _tradeQuantity, makerId, _order.id);
                    if (_order.quantityRemaining === 0)
                        break;
                }
            }
            if (_order.quantityRemaining !== 0) {
                if (this.sellOrders.has(_order.price)) {
                    this.sellOrders.get(_order.price).push(_order.id);
                }
                else {
                    this.sellOrders.set(_order.price, [_order.id]);
                    this.sellOrders = new Map([...this.sellOrders].sort((a, b) => a[0] - b[0]));
                }
            }
        }
        this.uniqueOrders.set(_order.id, _order);
        return _order;
    }
    /** Load an order by its id */
    getOneOrder(orderId) {
        this.logger.debug(`Loading order with id=${orderId}`);
        return this.uniqueOrders.get(orderId);
    }
    /** Load a trade by its id */
    getOneTrade(tradeId) {
        this.logger.debug(`Loading trade with id=${tradeId}`);
        return this.uniqueTrades.get(tradeId);
    }
    createNewTrade(price, quantity, buyOrderId, sellOrderId) {
        const _uniqueTradeId = this.uniqueTrades.size + 1;
        const _trade = {
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
exports.Clob = Clob;
//# sourceMappingURL=clob.js.map