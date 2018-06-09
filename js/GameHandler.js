"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ship_1 = require("./ship");
var marketplace_1 = require("./marketplace");
var GameHandler = /** @class */ (function () {
    function GameHandler() {
        this.currentShip = {};
    }
    GameHandler.prototype.setCurrentMarketplace = function (marketplace) {
        this.cuurentMarketplace = marketplace;
        return this.cuurentMarketplace;
    };
    GameHandler.prototype.setShip = function (ship) {
        this.currentShip = ship;
        return this.currentShip;
    };
    return GameHandler;
}());
exports.GameHandler = GameHandler;
;
var gameHandler = new GameHandler();
var ship = new ship_1.Ship();
var marketplace = new marketplace_1.Marketplace();
ship.setGameHandler(gameHandler);
var wish = require('wish');
var deepEqual = require('deep-equal');
describe('setShip()', function () {
    it('sets ship to current ship', function () {
        wish(deepEqual(gameHandler.setShip(ship), { _items: [{ resource: 'Water', quantity: 10 }],
            _cash: 0,
            gameHandler: gameHandler }));
    });
});
describe('currentShip.getCash()', function () {
    it('gets the ship cash', function () {
        wish(gameHandler.currentShip.getCash() === 0);
    });
});
//# sourceMappingURL=GameHandler.js.map