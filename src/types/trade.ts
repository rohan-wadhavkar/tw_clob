import { z } from "zod";

export const tradeSchema = z.object({
  /** Unique identifier for this trade */
  id: z.number(),
  /** Price of this trade */
  price: z.number(),
  /** Quantity of this trade */
  quantity: z.number(),
  /** Unique id of the buy-side order for this trade */
  buyOrderId: z.string(),
  /** Unique id of the sell-side order for this trade */
  sellOrderId: z.string(),
});

export type Trade = z.infer<typeof tradeSchema>;
