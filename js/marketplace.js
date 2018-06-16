"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Marketplace = /** @class */ (function () {
    function Marketplace(name, key) {
        this._items = [];
        this._items = this._setBaseItems();
        this.name = name;
        this.key = key;
    }
    ;
    Marketplace.prototype._setBaseItems = function () {
        this.addItem({ resource: 'Thorium', price: 200, quantity: 20 });
        this.addItem({ resource: 'Helium', price: 100, quantity: 5 });
        return this._items;
    };
    ;
    Marketplace.prototype.getItems = function () {
        return this._items;
    };
    ;
    Marketplace.prototype.getItem = function (item) {
        var foundItem = this._items.filter(function (marketplaceItem) { return marketplaceItem.resource === item; });
        if (foundItem.length == 1) {
            return foundItem[0];
        }
        else {
            return { resource: null, quantity: 0 };
        }
    };
    ;
    Marketplace.prototype.getPrice = function (item) {
        var foundItem = this._items.filter(function (marketplaceItem) { return marketplaceItem.resource === item; });
        return foundItem[0].price;
    };
    ;
    Marketplace.prototype.getQuantity = function (item) {
        var foundItem = this.getItem(item);
        return foundItem.quantity;
    };
    ;
    Marketplace.prototype.addItem = function (newItem) {
        var foundItem = this.getItem(newItem.resource);
        if (foundItem.resource != newItem.resource) {
            return this._items.push(newItem);
        }
        else {
            return this._items.length;
        }
    };
    ;
    Marketplace.prototype.updateQty = function (itemName, quantity) {
        var itemIndex = this._items.indexOf(this.getItem(itemName));
        var currentQuantity = this._items[itemIndex].quantity;
        this._items[itemIndex].quantity = currentQuantity >= (quantity * -1) ? currentQuantity + quantity : currentQuantity;
        return this._items[itemIndex].quantity;
    };
    return Marketplace;
}());
exports.Marketplace = Marketplace;
;
//# sourceMappingURL=marketplace.js.map