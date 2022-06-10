import { z } from "zod";
export declare const SIDE_BUY = "BUY";
export declare const SIDE_SELL = "SELL";
export declare const SIDES: readonly ["BUY", "SELL"];
/** Union of string literal types `"BUY" | "SELL"` */
export declare const sideSchema: z.ZodEnum<["BUY", "SELL"]>;
export declare type Side = z.infer<typeof sideSchema>;
//# sourceMappingURL=side.d.ts.map