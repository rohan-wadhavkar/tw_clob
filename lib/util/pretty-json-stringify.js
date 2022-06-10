"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prettyJsonStringify = void 0;
/** JSON.stringify's the input with two-space indentation */
function prettyJsonStringify(input) {
    return JSON.stringify(input, null, 2);
}
exports.prettyJsonStringify = prettyJsonStringify;
//# sourceMappingURL=pretty-json-stringify.js.map