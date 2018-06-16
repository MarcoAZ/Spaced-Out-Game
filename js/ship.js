"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ship = /** @class */ (function () {
    function Ship() {
        this._items = [];
        this._cash = 1000;
        this._items = this._setBaseItems();
        this._fuel = 10;
    }
    ;
    Ship.prototype._setBaseItems = function () {
        this.addItem({ resource: 'Water', quantity: 10 });
        return this._items;
    };
    ;
    Ship.prototype.addItem = function (newItem) {
        var foundItem = this.getItem(newItem.resource);
        if (foundItem.resource != newItem.resource) {
            return this._items.push(newItem);
        }
        else {
            return this._items.length;
        }
    };
    ;
    Ship.prototype.getItems = function () {
        return this._items;
    };
    ;
    Ship.prototype.getItem = function (item) {
        var foundItem = this._items.filter(function (cargoItem) { return cargoItem.resource === item; });
        if (foundItem.length == 1) {
            return foundItem[0];
        }
        else {
            return { resource: null, quantity: 0 };
        }
    };
    ;
    Ship.prototype.getCash = function () {
        return this._cash;
    };
    ;
    Ship.prototype.updateCash = function (amount) {
        return this._cash += amount;
    };
    Ship.prototype.spaceCargo = function () {
        while (this._items.length > 0) {
            this._items.pop();
        }
        return this._items;
    };
    ;
    Ship.prototype.getQuantity = function (item) {
        var foundItem = this.getItem(item);
        return foundItem.quantity;
    };
    ;
    Ship.prototype.updateQty = function (itemName, quantity) {
        var itemIndex = this._items.indexOf(this.getItem(itemName));
        var currentQuantity = this._items[itemIndex].quantity;
        this._items[itemIndex].quantity = currentQuantity >= (quantity * -1) ? currentQuantity + quantity : currentQuantity;
        return this._items[itemIndex].quantity;
    };
    Ship.prototype.getFuel = function () {
        return this._fuel;
    };
    Ship.prototype.updateFuel = function (quantity) {
        this._fuel += quantity;
        return this._fuel;
    };
    return Ship;
}());
exports.Ship = Ship;
;
//# sourceMappingURL=ship.js.map