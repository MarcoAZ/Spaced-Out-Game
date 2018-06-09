import {GameHandler} from './GameHandler';
import { Marketplace } from './marketplace';

export class Ship {
    constructor(){
        this._items = this._setBaseItems();
    };

    gameHandler; 
    _items = [];
    _cash = 0;

    _setBaseItems(){
        this.addItem({resource: 'Water', quantity: 10});
        return this._items;
    };

    setGameHandler(gh){
        this.gameHandler = gh;
    };

    addItem(newItem){
        const foundItem = this.getItem(newItem.resource);
        if(foundItem.resource != newItem.resource){
            return this._items.push(newItem);
        }
        else{
            return this._items.length;
        }
    };

    getItems(){
        return this._items;
    };

    getItem(item : string){
        const foundItem = this._items.filter(cargoItem => cargoItem.resource === item);
        if(foundItem.length == 1){
            return foundItem[0];
        }
        else{
            return {resource: null, quantity: 0};
        }
    };

    getCash(){
        return this._cash;
    };

    updateCash(amount: number){
        return this._cash += amount;
    }

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

let ship = new Ship();

let wish = require('wish');
let deepEqual = require('deep-equal');

describe('_setBaseItems()', function(){
    it('loads the base items of the game', function(){
        wish(deepEqual(ship._setBaseItems(), [{resource:'Water', quantity: 10}]));
    });
});

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

describe('updateCash()', function(){
    it('updates the ship wallet', function(){
        wish(ship.updateCash(50) === 50);
        wish(ship.updateCash(-25) === 25);
    });
});