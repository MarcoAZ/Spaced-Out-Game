class Marketplace {
    constructor(){
        this._items = this._setBaseItems();
    };

    _items = [];

    _setBaseItems(){
        this.addItem({resource: 'Thorium', price: '$200', quantity: 20});
        this.addItem({resource: 'Helium', price: '$100', quantity: 5});
        return this._items;
    };

    getItems(){
        return this._items;
    };

    getItem(item){
        const foundItem = this._items.filter(marketplaceItem => marketplaceItem.resource === item);
        if(foundItem.length == 1){
            return foundItem[0];
        }
        else{
            return {resource: item, quantity: 0};
        }
    };

    getPrice(item:string) {
        const foundItem = this._items.filter(marketplaceItem => marketplaceItem.resource === item);
        return foundItem[0].price;
    };

    getQuantity(item){
        const foundItem = this.getItem(item);
        return foundItem.quantity;
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

    updateQty(itemName, quantity){
        const itemIndex = this._items.indexOf(this.getItem(itemName));
        const currentQuantity = this._items[itemIndex].quantity;
        this._items[itemIndex].quantity = currentQuantity  >= (quantity * -1) ? currentQuantity + quantity : currentQuantity;

        return this._items[itemIndex].quantity;
    }
};

const marketplace = new Marketplace();

let wish = require('wish');
let deepEqual = require('deep-equal');

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

describe('addItem()', function(){
    it('fails to add a new item to the marketplace', function(){
        const previousLength = marketplace._items.length;
        wish(marketplace.addItem({resource: 'Helium', price: '$9000', quantity: 15}) === previousLength)
    });
});

describe('getQuantity()', function(){
    it('gets quantity of item in marker', function(){
        wish(marketplace.getQuantity('Helium') === 5);
    });
});

describe('getItem()', function(){
    it('returns a single item object', function(){
        wish(deepEqual(marketplace.getItem('Neon'), {resource: 'Neon', price: '$9000', quantity: 15}));
    });
});

describe('updateQty()', function(){
    it('removes given qty of item', function(){
        wish(marketplace.updateQty('Thorium', -10) === 10);
    });
});

describe('updateQty()', function(){
    it('adds given qty of item', function(){
        wish(marketplace.updateQty('Helium', 100) === 105);
    });
});

describe('updateQty()', function(){
    it('does not change qty of item', function(){
        wish(marketplace.updateQty('Neon', -100) === 15);
    });
});