class Ship {
    constructor(){

    };

    _items = [{resource: 'Water', quantity: 10}];
    _cash = 0;

    getItems(){
        return this._items;
    };

    getCash(){
        return this._cash;
    };

    spaceCargo(){
        while(this._items.length > 0){
            this._items.pop();
        }
        return this._items;
    };
};

const ship = new Ship();

wish = require('wish');
deepEqual = require('deep-equal');

describe('getItems()', function(){
    it('gets the cargo items', function(){
        wish(deepEqual(ship.getItems(), [{resource: 'Water', quantity: 10}]));
    });
});

describe('getCash()', function(){
    it('gets the ship cash', function(){
        wish(ship.getCash() === 0);
    });
});

describe('spaceCargo()', function(){
    it('empties the cargo bay', function(){
        wish(deepEqual(ship.spaceCargo(), []));
    });
});