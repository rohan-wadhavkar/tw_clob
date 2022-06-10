import { z } from "zod";
import { sideSchema } from "./side";

/** User-provided properties of a [limit
 * order](https://en.wikipedia.org/wiki/Order_(exchange)#Limit_order) */
export const orderInputSchema = z.object({
  /** Price limit of this order */
  price: z.number(),
  /** Quantity limit of this order */
  quantity: z.number(),
  /** Side of this order */
  side: sideSchema,
  /** Trader ID of this order */
  trader: z.string(),
});

export type OrderInput = z.infer<typeof orderInputSchema>;
