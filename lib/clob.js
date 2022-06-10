"use strict";
/* eslint-disable no-console */
/** This module implements a price-time matching engine for a centralize limit
 * order book (CLOB).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clob = void 0;
const logger_1 = require("./util/logger");
const id_factory_1 = require("./util/id-factory");
const timestamp_factory_1 = require("./util/timestamp-factory");
const not_yet_implemented_error_1 = require("./util/not-yet-implemented-error");
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
            if (this.sellOrders.has(input.price)) {
                if (this.sellOrders.get(input.price).length > 0) {
                    _order.quantity = 0;
                    const maker = this.getOneOrder(this.sellOrders.get(input.price)[0]);
                    maker.quantity = 0;
                    this.uniqueOrders.set(maker.id, maker);
                }
            }
            this.uniqueOrders.set(_order.id, _order);
        }
        else {
            const foundIndex = this.expectedBook.bids.findIndex((x) => x.price === input.price);
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
        }
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
        throw new not_yet_implemented_error_1.NotYetImplementedError();
    }
}
exports.Clob = Clob;
//# sourceMappingURL=clob.js.map