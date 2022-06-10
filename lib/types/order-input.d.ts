import { z } from "zod";
/** User-provided properties of a [limit
 * order](https://en.wikipedia.org/wiki/Order_(exchange)#Limit_order) */
export declare const orderInputSchema: z.ZodObject<{
    /** Price limit of this order */
    price: z.ZodNumber;
    /** Quantity limit of this order */
    quantity: z.ZodNumber;
    /** Side of this order */
    side: z.ZodEnum<["BUY", "SELL"]>;
    /** Trader ID of this order */
    trader: z.ZodString;
}, "strip", z.ZodTypeAny, {
    price: number;
    quantity: number;
    side: "BUY" | "SELL";
    trader: string;
}, {
    price: number;
    quantity: number;
    side: "BUY" | "SELL";
    trader: string;
}>;
export declare type OrderInput = z.infer<typeof orderInputSchema>;
//# sourceMappingURL=order-input.d.ts.map