"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestampFactory = void 0;
/**
 * @returns the current date and time as an ISO 8601 string
 * https://en.wikipedia.org/wiki/ISO_8601
 */
function timestampFactory() {
    return new Date().toISOString();
}
exports.timestampFactory = timestampFactory;
//# sourceMappingURL=timestamp-factory.js.map