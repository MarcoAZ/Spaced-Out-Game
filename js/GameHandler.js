"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var locations;
(function (locations) {
    locations["start"] = "Start";
    locations["kandinsky"] = "Kandinsky Station";
})(locations = exports.locations || (exports.locations = {}));
var GameHandler = /** @class */ (function () {
    function GameHandler() {
        this.currentShip = {};
        this.gameLocations = [];
    }
    GameHandler.prototype.setCurrentMarketplace = function (marketplace) {
        this.cuurentMarketplace = marketplace;
        return this.cuurentMarketplace;
    };
    GameHandler.prototype.setCurrentShip = function (ship) {
        this.currentShip = ship;
        return this.currentShip;
    };
    GameHandler.prototype.createMarkets = function () {
        for (var market in Object.keys(locations)) {
            this.gameLocations.push(market);
        }
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
    GameHandler.prototype.sellingItem = function (itemName, quantity) {
        if (quantity <= this.currentShip.getQuantity(itemName) && quantity > 0) {
            var revenue = this.cuurentMarketplace.getPrice(itemName) * quantity;
            this.currentShip.updateCash(revenue);
            this.currentShip.updateQty(itemName, quantity * -1);
            this.cuurentMarketplace.updateQty(itemName, quantity);
            return true;
        }
        return false;
    };
    return GameHandler;
}());
exports.GameHandler = GameHandler;
;
//# sourceMappingURL=GameHandler.js.map