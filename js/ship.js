"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShipModule;
(function (ShipModule) {
    var Ship = /** @class */ (function () {
        function Ship() {
            this._items = [{ resource: 'Water', quantity: 10 }];
            this._cash = 0;
        }
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
                return { resource: item, quantity: 0 };
            }
        };
        ;
        Ship.prototype.getCash = function () {
            return this._cash;
        };
        ;
        Ship.prototype.spaceCargo = function () {
            while (this._items.length > 0) {
                this._items.pop();
            }
            return this._items;
        };
        ;
        Ship.prototype.updateQty = function (itemName, quantity) {
            var itemIndex = this._items.indexOf(this.getItem(itemName));
            var currentQuantity = this._items[itemIndex].quantity;
            this._items[itemIndex].quantity = currentQuantity >= (quantity * -1) ? currentQuantity + quantity : currentQuantity;
            return this._items[itemIndex].quantity;
        };
        return Ship;
    }());
    ShipModule.Ship = Ship;
    ;
})(ShipModule = exports.ShipModule || (exports.ShipModule = {}));
var ship = new ShipModule.Ship();
var wish = require('wish');
var deepEqual = require('deep-equal');
describe('getItems()', function () {
    it('gets the cargo items', function () {
        wish(deepEqual(ship.getItems(), [{ resource: 'Water', quantity: 10 }]));
    });
});
describe('getCash()', function () {
    it('gets the ship cash', function () {
        wish(ship.getCash() === 0);
    });
});
describe('getItem()', function () {
    it('returns a single cargo item', function () {
        wish(deepEqual(ship.getItem('Water'), { resource: 'Water', quantity: 10 }));
    });
});
describe('spaceCargo()', function () {
    it('empties the cargo bay', function () {
        wish(deepEqual(ship.spaceCargo(), []));
    });
});
//# sourceMappingURL=ship.js.map