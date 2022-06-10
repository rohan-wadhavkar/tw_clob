import { z } from "zod";
/** For the public order book, open orders are aggregated into [price
 * levels](https://en.wikipedia.org/wiki/Order_book#Price_levels) */
export declare const priceLevelSchema: z.ZodObject<{
    /** Price of this level */
    price: z.ZodNumber;
    /** Total quantity at this level */
    quantity: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    price: number;
    quantity: number;
}, {
    price: number;
    quantity: number;
}>;
export declare type PriceLevel = z.infer<typeof priceLevelSchema>;
//# sourceMappingURL=price-level-schema.d.ts.map