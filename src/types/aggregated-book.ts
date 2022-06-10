import { z } from "zod";
import { priceLevelSchema } from "./price-level-schema";

/** Open orders aggregated for public consumption */
export const aggregatedBookSchema = z.object({
  /** Buy orders aggregated by price */
  bids: z.array(priceLevelSchema),
  /** Sell orders aggregated by price */
  asks: z.array(priceLevelSchema),
});

export type AggregatedBook = z.infer<typeof aggregatedBookSchema>;
