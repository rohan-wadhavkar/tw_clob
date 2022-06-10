"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idFactory = void 0;
/** Factory for short random strings with approximately 57 bits of entropy
 * @returns A ~10 character string composed of characters a-z and 0-9
 */
function idFactory() {
    return Math.random().toString(36).slice(2);
}
exports.idFactory = idFactory;
//# sourceMappingURL=id-factory.js.map