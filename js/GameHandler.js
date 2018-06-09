"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ship_1 = require("./ship");
var GameHandler = /** @class */ (function () {
    function GameHandler() {
        this.ship = new ship_1.ShipModule.Ship();
    }
    return GameHandler;
}());
var gameHandler = new GameHandler();
console.log(gameHandler.ship);
var wish = require('wish');
var deepEqual = require('deep-equal');
describe('test GameHandler uses new ship', function () {
    it('gets the ship cash', function () {
        wish(gameHandler.ship.getCash() === 0);
    });
});
//# sourceMappingURL=GameHandler.js.map