class Ship {
    constructor(){

    };

    _items = [{resource: 'Water', quantity: 10}];
    _cash = 0;

    getItems(){
        return this._items;
    };

    getItem(item : string){
        const foundItem = this._items.filter(cargoItem => cargoItem.resource === item);
        if(foundItem.length == 1){
            return foundItem[0];
        }
        else{
            return {resource: item, quantity: 0};
        }
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

    updateQty(itemName: string, quantity: number){
        const itemIndex = this._items.indexOf(this.getItem(itemName));
        const currentQuantity = this._items[itemIndex].quantity;
        this._items[itemIndex].quantity = currentQuantity  >= (quantity * -1) ? currentQuantity + quantity : currentQuantity;

        return this._items[itemIndex].quantity;
    }
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

describe('getItem()', function(){
    it('returns a single cargo item', function(){
        wish(deepEqual(ship.getItem('Water'), {resource: 'Water', quantity: 10}));
    });
});

describe('spaceCargo()', function(){
    it('empties the cargo bay', function(){
        wish(deepEqual(ship.spaceCargo(), []));
    });
});