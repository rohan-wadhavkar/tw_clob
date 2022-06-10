"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clob_1 = require("../clob");
const side_1 = require("../types/side");
describe(`${clob_1.Clob.name}#${clob_1.Clob.prototype.getAggregatedBook.name}`, () => {
    it.skip("aggregates all the orders into price levels", () => {
        const clob = new clob_1.Clob();
        const price = 100;
        const quantity = 225;
        const input = {
            side: side_1.SIDE_BUY,
            price,
            quantity,
            trader: "buyer",
        };
        // Add the order twice
        clob.createOneOrder(input);
        clob.createOneOrder(input);
        const expectedBook = {
            asks: [],
            bids: [{ price, quantity: quantity + quantity }],
        };
        expect(clob.getAggregatedBook()).toEqual(expectedBook);
    });
});
//# sourceMappingURL=clob-get-aggregated-book.test.js.map