import { z } from "zod";

/** For the public order book, open orders are aggregated into [price
 * levels](https://en.wikipedia.org/wiki/Order_book#Price_levels) */
export const priceLevelSchema = z.object({
  /** Price of this level */
  price: z.number(),
  /** Total quantity at this level */
  quantity: z.number(),
});

export type PriceLevel = z.infer<typeof priceLevelSchema>;
