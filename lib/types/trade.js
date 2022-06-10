"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tradeSchema = void 0;
const zod_1 = require("zod");
exports.tradeSchema = zod_1.z.object({
    /** Unique identifier for this trade */
    id: zod_1.z.number(),
    /** Price of this trade */
    price: zod_1.z.number(),
    /** Quantity of this trade */
    quantity: zod_1.z.number(),
    /** Unique id of the buy-side order for this trade */
    buyOrderId: zod_1.z.string(),
    /** Unique id of the sell-side order for this trade */
    sellOrderId: zod_1.z.string(),
});
//# sourceMappingURL=trade.js.map