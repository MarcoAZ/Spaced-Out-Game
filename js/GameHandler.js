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
    GameHandler.prototype.setCurrentShip = function (ship) {
        this.currentShip = ship;
        return this.currentShip;
    };
    GameHandler.prototype.buyingItem = function (itemName, quantity) {
        if (quantity <= this.cuurentMarketplace.getQuantity(itemName)) {
            var cost = this.cuurentMarketplace.getPrice(itemName) * quantity;
            if (cost <= this.currentShip.getCash()) {
                if (this.currentShip.getItem(itemName).resource === null) {
                    this.currentShip.addItem({ resource: itemName, quantity: quantity });
                }
                else {
                    this.currentShip.updateQty(itemName, quantity);
                }
                this.currentShip.updateCash(cost * -1);
                this.cuurentMarketplace.updateQty(itemName, quantity * -1);
                return true;
            }
        }
        return false;
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
describe('setCurrentShip()', function () {
    it('sets ship to current ship', function () {
        wish(deepEqual(gameHandler.setCurrentShip(ship), { _items: [{ resource: 'Water', quantity: 10 }],
            _cash: 1000,
            gameHandler: gameHandler }));
    });
});
describe('setCurrentMarketplace()', function () {
    it('sets current marketplace', function () {
        wish(deepEqual(gameHandler.setCurrentMarketplace(marketplace), { _items: [{ resource: 'Thorium', price: 200, quantity: 20 },
                { resource: 'Helium', price: 100, quantity: 5 }] }));
    });
});
describe('currentShip.getCash()', function () {
    it('gets the ship cash', function () {
        wish(gameHandler.currentShip.getCash() === 1000);
    });
});
describe('buyingItem()', function () {
    it('adds quantity of item to ship and charges the cost', function () {
        var shipCashBefore = gameHandler.currentShip.getCash();
        var marketQtyBefore = gameHandler.cuurentMarketplace.getQuantity('Helium');
        wish(gameHandler.buyingItem('Helium', 5) === true);
        wish(deepEqual(gameHandler.currentShip.getItems(), [{ resource: 'Water', quantity: 10 },
            { resource: 'Helium', quantity: 5 }]));
        wish(shipCashBefore - 500 === gameHandler.currentShip.getCash());
        wish(marketQtyBefore - 5 === gameHandler.cuurentMarketplace.getQuantity('Helium'));
    });
});
//# sourceMappingURL=GameHandler.js.map