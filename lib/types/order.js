"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = void 0;
const zod_1 = require("zod");
const order_input_1 = require("./order-input");
/** Limit order in the CLOB */
exports.orderSchema = order_input_1.orderInputSchema.extend({
    /** ISO 8601 timestamp of the date/time at which this order was created */
    createdAt: zod_1.z.string(),
    /** Unique identifier for this order */
    id: zod_1.z.string(),
    /** Quantity remaining to be filled */
    quantityRemaining: zod_1.z.number(),
    /** Unique IDs of the trades executed on this order */
    tradeIds: zod_1.z.array(zod_1.z.string()),
});
//# sourceMappingURL=order.js.map