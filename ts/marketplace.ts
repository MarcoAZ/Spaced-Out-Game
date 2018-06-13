export class Marketplace {
    constructor(name:string){
        this._items = this._setBaseItems();
        this.name = name;
    };

    _items = [];
    name;

    _setBaseItems(){
        this.addItem({resource: 'Thorium', price: 200, quantity: 20});
        this.addItem({resource: 'Helium', price: 100, quantity: 5});
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
            return {resource: null, quantity: 0};
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

