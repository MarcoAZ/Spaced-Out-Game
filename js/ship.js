"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ship = /** @class */ (function () {
    function Ship(location) {
        this._items = [];
        this._cash = 1000;
        this._items = this._setBaseItems();
        this._location = location;
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
    Ship.prototype.setLocation = function (newLocation) {
        this._location = newLocation;
        return this._location;
    };
    return Ship;
}());
exports.Ship = Ship;
;
var ship = new Ship('Start');
var wish = require('wish');
var deepEqual = require('deep-equal');
describe('_setBaseItems()', function () {
    it('loads the base items of the game', function () {
        wish(deepEqual(ship._setBaseItems(), [{ resource: 'Water', quantity: 10 }]));
    });
});
describe('getItems()', function () {
    it('gets the cargo items', function () {
        wish(deepEqual(ship.getItems(), [{ resource: 'Water', quantity: 10 }]));
    });
});
describe('getQuantity()', function () {
    it('gets quantity of item', function () {
        wish(ship.getQuantity('Water') === 10);
    });
});
describe('getCash()', function () {
    it('gets the ship cash', function () {
        wish(ship.getCash() === 1000);
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
describe('updateCash()', function () {
    it('updates the ship wallet', function () {
        wish(ship.updateCash(50) === 1050);
        wish(ship.updateCash(-25) === 1025);
    });
});
describe('setLocation()', function () {
    it('sets new ship location', function () {
        var loc = 'Home';
        wish(ship.setLocation(loc) === loc);
    });
});
//# sourceMappingURL=ship.js.map