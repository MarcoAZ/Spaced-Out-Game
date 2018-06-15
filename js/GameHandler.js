"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var marketplace_1 = require("./marketplace");
var locations;
(function (locations) {
    locations["Start"] = "Start";
    locations["Kandinsky"] = "Kandinsky Station";
})(locations = exports.locations || (exports.locations = {}));
var GameHandler = /** @class */ (function () {
    function GameHandler() {
        this.gameLocations = [];
        this.currentShip = {};
        this.createMarkets();
    }
    GameHandler.prototype.setCurrentMarketplace = function (marketplace) {
        this.currentMarketplace = marketplace;
        return this.currentMarketplace;
    };
    GameHandler.prototype.setCurrentShip = function (ship) {
        this.currentShip = ship;
        return this.currentShip;
    };
    GameHandler.prototype.createMarkets = function () {
        for (var market in locations) {
            var newMarket = new marketplace_1.Marketplace(locations[market]);
            this.gameLocations.push(newMarket);
        }
        return this.gameLocations;
    };
    GameHandler.prototype.buyingItem = function (itemName, quantity) {
        if (quantity <= this.currentMarketplace.getQuantity(itemName)) {
            var cost = this.currentMarketplace.getPrice(itemName) * quantity;
            if (cost <= this.currentShip.getCash()) {
                if (this.currentShip.getItem(itemName).resource === null) {
                    this.currentShip.addItem({ resource: itemName, quantity: quantity });
                }
                else {
                    this.currentShip.updateQty(itemName, quantity);
                }
                this.currentShip.updateCash(cost * -1);
                this.currentMarketplace.updateQty(itemName, quantity * -1);
                return true;
            }
        }
        return false;
    };
    GameHandler.prototype.sellingItem = function (itemName, quantity) {
        if (quantity <= this.currentShip.getQuantity(itemName) && quantity > 0) {
            var revenue = this.currentMarketplace.getPrice(itemName) * quantity;
            this.currentShip.updateCash(revenue);
            this.currentShip.updateQty(itemName, quantity * -1);
            this.currentMarketplace.updateQty(itemName, quantity);
            return true;
        }
        return false;
    };
    return GameHandler;
}());
exports.GameHandler = GameHandler;
;
//# sourceMappingURL=GameHandler.js.map