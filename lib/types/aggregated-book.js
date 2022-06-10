"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aggregatedBookSchema = void 0;
const zod_1 = require("zod");
const price_level_schema_1 = require("./price-level-schema");
/** Open orders aggregated for public consumption */
exports.aggregatedBookSchema = zod_1.z.object({
    /** Buy orders aggregated by price */
    bids: zod_1.z.array(price_level_schema_1.priceLevelSchema),
    /** Sell orders aggregated by price */
    asks: zod_1.z.array(price_level_schema_1.priceLevelSchema),
});
//# sourceMappingURL=aggregated-book.js.map