"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderInputSchema = void 0;
const zod_1 = require("zod");
const side_1 = require("./side");
/** User-provided properties of a [limit
 * order](https://en.wikipedia.org/wiki/Order_(exchange)#Limit_order) */
exports.orderInputSchema = zod_1.z.object({
    /** Price limit of this order */
    price: zod_1.z.number(),
    /** Quantity limit of this order */
    quantity: zod_1.z.number(),
    /** Side of this order */
    side: side_1.sideSchema,
    /** Trader ID of this order */
    trader: zod_1.z.string(),
});
//# sourceMappingURL=order-input.js.map