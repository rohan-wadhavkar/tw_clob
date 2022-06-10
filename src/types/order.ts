import { z } from "zod";
import { orderInputSchema } from "./order-input";

/** Limit order in the CLOB */
export const orderSchema = orderInputSchema.extend({
  /** ISO 8601 timestamp of the date/time at which this order was created */
  createdAt: z.string(),
  /** Unique identifier for this order */
  id: z.string(),
  /** Quantity remaining to be filled */
  quantityRemaining: z.number(),
  /** Unique IDs of the trades executed on this order */
  tradeIds: z.array(z.string()),
});

export type Order = z.infer<typeof orderSchema>;
