import { z } from "zod";
/** Limit order in the CLOB */
export declare const orderSchema: z.ZodObject<z.extendShape<{
    price: z.ZodNumber;
    quantity: z.ZodNumber;
    side: z.ZodEnum<["BUY", "SELL"]>;
    trader: z.ZodString;
}, {
    /** ISO 8601 timestamp of the date/time at which this order was created */
    createdAt: z.ZodString;
    /** Unique identifier for this order */
    id: z.ZodString;
    /** Quantity remaining to be filled */
    quantityRemaining: z.ZodNumber;
    /** Unique IDs of the trades executed on this order */
    tradeIds: z.ZodArray<z.ZodString, "many">;
}>, "strip", z.ZodTypeAny, {
    price: number;
    quantity: number;
    side: "BUY" | "SELL";
    trader: string;
    createdAt: string;
    id: string;
    quantityRemaining: number;
    tradeIds: string[];
}, {
    price: number;
    quantity: number;
    side: "BUY" | "SELL";
    trader: string;
    createdAt: string;
    id: string;
    quantityRemaining: number;
    tradeIds: string[];
}>;
export declare type Order = z.infer<typeof orderSchema>;
//# sourceMappingURL=order.d.ts.map