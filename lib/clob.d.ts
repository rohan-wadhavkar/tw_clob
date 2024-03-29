/** This module implements a price-time matching engine for a centralize limit
 * order book (CLOB).
 */
import { Order } from "./types/order";
import { OrderInput } from "./types/order-input";
import { AggregatedBook } from "./types/aggregated-book";
import { Trade } from "./types/trade";
/** Single-ticket CLOB order book and trade execution engine */
export declare class Clob {
    private readonly logger;
    expectedBook: AggregatedBook;
    buyOrders: Map<any, any>;
    sellOrders: Map<any, any>;
    uniqueOrders: Map<any, any>;
    uniqueTrades: Map<any, any>;
    constructor();
    /** Aggregate open orders into publicly-available price levels */
    getAggregatedBook(): AggregatedBook;
    /** Handle an order request placed by a trader
     * @param input Order event
     * @returns The newly-created ClobOrder
     */
    createOneOrder(input: OrderInput): Order;
    /** Load an order by its id */
    getOneOrder(orderId: string): Order;
    /** Load a trade by its id */
    getOneTrade(tradeId: string): Trade;
    createNewTrade(price: number, quantity: number, buyOrderId: string, sellOrderId: string): void;
}
//# sourceMappingURL=clob.d.ts.map