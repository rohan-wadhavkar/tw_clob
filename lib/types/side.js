"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sideSchema = exports.SIDES = exports.SIDE_SELL = exports.SIDE_BUY = void 0;
const zod_1 = require("zod");
exports.SIDE_BUY = "BUY";
exports.SIDE_SELL = "SELL";
exports.SIDES = [exports.SIDE_BUY, exports.SIDE_SELL];
/** Union of string literal types `"BUY" | "SELL"` */
exports.sideSchema = zod_1.z.enum(exports.SIDES);
//# sourceMappingURL=side.js.map