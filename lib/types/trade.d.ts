import { z } from "zod";
export declare const tradeSchema: z.ZodObject<{
    /** Unique identifier for this trade */
    id: z.ZodNumber;
    /** Price of this trade */
    price: z.ZodNumber;
    /** Quantity of this trade */
    quantity: z.ZodNumber;
    /** Unique id of the buy-side order for this trade */
    buyOrderId: z.ZodString;
    /** Unique id of the sell-side order for this trade */
    sellOrderId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    price: number;
    quantity: number;
    id: number;
    buyOrderId: string;
    sellOrderId: string;
}, {
    price: number;
    quantity: number;
    id: number;
    buyOrderId: string;
    sellOrderId: string;
}>;
export declare type Trade = z.infer<typeof tradeSchema>;
//# sourceMappingURL=trade.d.ts.map