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

/** Single-ticket CLOB order book and trade execution engine */
export class Clob {
  private readonly logger = new Logger(Clob.name);

  public constructor() {
    this.logger.debug("Instantiating");
  }

  /** Aggregate open orders into publicly-available price levels */
  getAggregatedBook(): AggregatedBook {
    this.logger.debug("Getting aggregated book");
    throw new NotYetImplementedError();
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
    throw new NotYetImplementedError();
  }

  /** Load an order by its id */
  getOneOrder(orderId: string): Order {
    this.logger.debug(`Loading order with id=${orderId}`);
    throw new NotYetImplementedError();
  }

  /** Load a trade by its id */
  getOneTrade(tradeId: string): Trade {
    this.logger.debug(`Loading trade with id=${tradeId}`);
    throw new NotYetImplementedError();
  }
}
