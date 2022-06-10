import { z } from "zod";

export const SIDE_BUY = "BUY";
export const SIDE_SELL = "SELL";

export const SIDES = [SIDE_BUY, SIDE_SELL] as const;

/** Union of string literal types `"BUY" | "SELL"` */
export const sideSchema = z.enum(SIDES);

export type Side = z.infer<typeof sideSchema>;
