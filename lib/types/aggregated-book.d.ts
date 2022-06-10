import { z } from "zod";
/** Open orders aggregated for public consumption */
export declare const aggregatedBookSchema: z.ZodObject<{
    /** Buy orders aggregated by price */
    bids: z.ZodArray<z.ZodObject<{
        price: z.ZodNumber;
        /** Sell orders aggregated by price */
        quantity: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        price: number;
        quantity: number;
    }, {
        price: number;
        quantity: number;
    }>, "many">;
    /** Sell orders aggregated by price */
    asks: z.ZodArray<z.ZodObject<{
        price: z.ZodNumber;
        quantity: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        price: number;
        quantity: number;
    }, {
        price: number;
        quantity: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    bids: {
        price: number;
        quantity: number;
    }[];
    asks: {
        price: number;
        quantity: number;
    }[];
}, {
    bids: {
        price: number;
        quantity: number;
    }[];
    asks: {
        price: number;
        quantity: number;
    }[];
}>;
export declare type AggregatedBook = z.infer<typeof aggregatedBookSchema>;
//# sourceMappingURL=aggregated-book.d.ts.map