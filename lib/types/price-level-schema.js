"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.priceLevelSchema = void 0;
const zod_1 = require("zod");
/** For the public order book, open orders are aggregated into [price
 * levels](https://en.wikipedia.org/wiki/Order_book#Price_levels) */
exports.priceLevelSchema = zod_1.z.object({
    /** Price of this level */
    price: zod_1.z.number(),
    /** Total quantity at this level */
    quantity: zod_1.z.number(),
});
//# sourceMappingURL=price-level-schema.js.map