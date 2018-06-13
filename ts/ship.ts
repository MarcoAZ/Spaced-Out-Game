export class Ship {
    constructor(location: string){
        this._items = this._setBaseItems();
        this._location = location;
    };

    _items = [];
    _cash = 1000;
    _location;

    _setBaseItems(){
        this.addItem({resource: 'Water', quantity: 10});
        return this._items;
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

    getQuantity(item){
        const foundItem = this.getItem(item);
        return foundItem.quantity;
    };

    updateQty(itemName: string, quantity: number){
        const itemIndex = this._items.indexOf(this.getItem(itemName));
        const currentQuantity = this._items[itemIndex].quantity;
        this._items[itemIndex].quantity = currentQuantity  >= (quantity * -1) ? currentQuantity + quantity : currentQuantity;

        return this._items[itemIndex].quantity;
    }

    setLocation(newLocation: string){
        this._location = newLocation;
        return this._location;
    }
};