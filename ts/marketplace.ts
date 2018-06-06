class Marketplace {
    _items = [];

    constructor(){
        this._items = this._setBaseItems();
    }

    getItems(){
        return this._items;
    };

    getPrice(item:string) {
        const foundItem = this._items.filter(marketplaceItem => marketplaceItem.resource === item);
        return foundItem[0].price;
    };

    getQuantity(item){
        const foundItem = this._items.filter(marketplaceItem => marketplaceItem.resource === item);
        if(foundItem.length == 1){
            return foundItem[0].quantity;
        }
        else{
            return foundItem.length;
        }
    }

    addItem(newItem){
        const foundItem = this._items.filter(marketplaceItem => marketplaceItem.resource === newItem.resource);
        if(foundItem.length == 0){
            return this._items.push(newItem);
        }
        else{
            return this._items.length;
        }
    };

    _setBaseItems(){
        this.addItem({resource: 'Thorium', price: '$200', quantity: 20});
        this.addItem({resource: 'Helium', price: '$100', quantity: 5});
        return this._items;
    };
};

const marketplace = new Marketplace();

const wish = require('wish');
const deepEqual = require('deep-equal');

describe('_setBaseItems()', function(){
    it('loads the base items of the game', function(){
        wish(deepEqual(marketplace._setBaseItems(), [{resource:'Thorium', price: '$200', quantity: 20},
                                                     {resource: 'Helium', price: '$100', quantity: 5}]));
    });
});

describe('getPrice()', function () {
    it('returns the base price of Helium', function(){
        wish(marketplace.getPrice('Helium') === '$100');
    });
});

describe('getPrice()', function () {
    it('returns the base price of Thorium', function(){
        wish(marketplace.getPrice('Thorium') === '$200');
    });
});

describe('getItems()', function(){
    it('gets the marketplace items', function(){
        wish(deepEqual(marketplace.getItems(), [{resource:'Thorium', price: '$200', quantity: 20},
                                                {resource: 'Helium', price: '$100', quantity: 5}]));
    });
});

describe('addItem()', function(){
    it('adds a new item to the marketplace', function(){
        const previousLength = marketplace._items.length;
        wish(marketplace.addItem({resource: 'Neon', price: '$9000', quantity: 15}) === previousLength+1)
    });
});

describe('getQuantity()', function(){
    it('gets quantity of item in marker', function(){
        wish(marketplace.getQuantity('Helium') == 5);
    });
});