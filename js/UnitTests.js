"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ship_1 = require("./ship");
var marketplace_1 = require("./marketplace");
var GameHandler_1 = require("./GameHandler");
var GameHandler_2 = require("./GameHandler");
var gameHandler = new GameHandler_1.GameHandler();
var ship = new ship_1.Ship();
var marketplace = new marketplace_1.Marketplace(GameHandler_2.locations.Start.name, GameHandler_2.locations.Start.key);
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
describe('_setBaseItems()', function () {
    it('loads the base items of the game', function () {
        wish(deepEqual(marketplace._setBaseItems(), [{ resource: 'Thorium', price: 200, quantity: 20 },
            { resource: 'Helium', price: 100, quantity: 5 }]));
    });
});
describe('getPrice()', function () {
    it('returns the base price of Helium', function () {
        wish(marketplace.getPrice('Helium') === 100);
    });
});
describe('getPrice()', function () {
    it('returns the base price of Thorium', function () {
        wish(marketplace.getPrice('Thorium') === 200);
    });
});
describe('getItems()', function () {
    it('gets the marketplace items', function () {
        wish(deepEqual(marketplace.getItems(), [{ resource: 'Thorium', price: 200, quantity: 20 },
            { resource: 'Helium', price: 100, quantity: 5 }]));
    });
});
describe('addItem()', function () {
    it('adds a new item to the marketplace', function () {
        var previousLength = marketplace._items.length;
        wish(marketplace.addItem({ resource: 'Neon', price: 9000, quantity: 15 }) === previousLength + 1);
    });
});
describe('addItem()', function () {
    it('fails to add a new item to the marketplace', function () {
        var previousLength = marketplace._items.length;
        wish(marketplace.addItem({ resource: 'Helium', price: 9000, quantity: 15 }) === previousLength);
    });
});
describe('getQuantity()', function () {
    it('gets quantity of item in marker', function () {
        wish(marketplace.getQuantity('Helium') === 5);
    });
});
describe('getItem()', function () {
    it('returns a single item object', function () {
        wish(deepEqual(marketplace.getItem('Neon'), { resource: 'Neon', price: 9000, quantity: 15 }));
    });
});
describe('updateQty()', function () {
    it('removes given qty of item', function () {
        wish(marketplace.updateQty('Thorium', -10) === 10);
    });
});
describe('updateQty()', function () {
    it('adds given qty of item', function () {
        wish(marketplace.updateQty('Helium', 100) === 105);
    });
});
describe('updateQty()', function () {
    it('does not change qty of item', function () {
        wish(marketplace.updateQty('Neon', -100) === 15);
    });
});
describe('setCurrentShip()', function () {
    it('sets ship to current ship', function () {
        var currentShip = gameHandler.setCurrentShip(ship);
        wish(!deepEqual(currentShip, {}));
    });
});
describe('setCurrentMarketplace()', function () {
    it('sets current marketplace', function () {
        wish(!deepEqual(gameHandler.setCurrentMarketplace(marketplace), {}));
    });
});
describe('currentShip.getCash()', function () {
    it('gets the ship cash', function () {
        wish(gameHandler.currentShip.getCash() === 1025);
    });
});
describe('buyingItem()', function () {
    it('adds quantity of item to ship and charges the cost', function () {
        var shipCashBefore = gameHandler.currentShip.getCash();
        var marketQtyBefore = gameHandler.currentMarketplace.getQuantity('Helium');
        wish(gameHandler.buyingItem('Helium', 5) === true);
        var shipItems = gameHandler.currentShip.getItems();
        wish(shipItems.filter(function (helium) { return helium.resource === 'Helium'; }).length === 1);
        wish(shipCashBefore - 500 === gameHandler.currentShip.getCash());
        wish(marketQtyBefore - 5 === gameHandler.currentMarketplace.getQuantity('Helium'));
    });
});
describe('sellingItem()', function () {
    it('sells ship items to the Marketplace', function () {
        var shipCashBefore = gameHandler.currentShip.getCash();
        var thorium = { resource: 'Thorium', quantity: 1 };
        ship.addItem({ resource: 'Thorium', quantity: 1 });
        var marketQtyBefore = gameHandler.currentMarketplace.getQuantity('Thorium');
        var shipQtyBefore = gameHandler.currentShip.getQuantity('Thorium');
        wish(gameHandler.sellingItem(thorium.resource, thorium.quantity) === true);
        wish(gameHandler.currentShip.getCash() - shipCashBefore === gameHandler.currentMarketplace.getPrice('Thorium'));
        wish(gameHandler.currentMarketplace.getQuantity('Thorium') - 1 === marketQtyBefore);
        wish(gameHandler.currentShip.getQuantity('Thorium') + 1 === shipQtyBefore);
    });
});
describe('createMarkets()', function () {
    it('initiates market locations with at least 2 locations', function () {
        var testGH = new GameHandler_1.GameHandler();
        wish(testGH.gameLocations.length > 1);
    });
});
describe('changeMarket()', function () {
    it('switches current market to the new market. costs fuel', function () {
        var testGH = new GameHandler_1.GameHandler();
        var kandinsky = new marketplace_1.Marketplace(GameHandler_2.locations.Kandinsky.name, GameHandler_2.locations.Kandinsky.key);
        testGH.setCurrentShip(ship);
        testGH.setCurrentMarketplace(new marketplace_1.Marketplace(GameHandler_2.locations.Start.name, GameHandler_2.locations.Start.key));
        var fuelCost = testGH.distanceBetween(GameHandler_2.locations.Start.key, GameHandler_2.locations.Kandinsky.key);
        var beforeFuel = testGH.currentShip.getFuel();
        var changedMarket = testGH.changeMarket(kandinsky);
        wish(changedMarket === true);
        wish(deepEqual(testGH.currentMarketplace, kandinsky));
        wish(testGH.currentShip.getFuel() === beforeFuel - fuelCost);
    });
});
describe('updateFuel()', function () {
    it('use or add fuel', function () {
        var current = ship._fuel;
        wish(ship.updateFuel(100) === current + 100);
        wish(ship.updateFuel(-100) === current);
    });
});
describe('distanceBetween()', function () {
    it('gets distance between stations', function () {
        wish(gameHandler.distanceBetween('Start', 'Kandinsky') === 4);
    });
});
//# sourceMappingURL=UnitTests.js.map