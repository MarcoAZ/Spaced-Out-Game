import {Ship} from './ship';
import { Marketplace } from './marketplace';

export class GameHandler {
    currentShip;
    cuurentMarketplace;

    constructor(){
        this.currentShip = {};
    }

    setCurrentMarketplace(marketplace: Marketplace){
        this.cuurentMarketplace = marketplace;
        return this.cuurentMarketplace;
        
    }

    setCurrentShip(ship: Ship){
        this.currentShip = ship;
        return this.currentShip;
    }

    buyingItem(itemName: string, quantity: number){
        if(quantity <= this.cuurentMarketplace.getQuantity(itemName)){
            const cost = this.cuurentMarketplace.getPrice(itemName) * quantity;
            if(cost <= this.currentShip.getCash()){
                if(this.currentShip.getItem(itemName).resource === null){
                    this.currentShip.addItem({resource: itemName, quantity: quantity});
                }
                else{
                    this.currentShip.updateQty(itemName, quantity);
                }
                this.currentShip.updateCash(cost * -1);
                this.cuurentMarketplace.updateQty(itemName, quantity * -1);
                return true;
            }
        }
        return false;
    }

    sellingItem(itemName: string, quantity: number){
        if(quantity <= this.currentShip.getQuantity(itemName) && quantity > 0){
            const revenue = this.cuurentMarketplace.getPrice(itemName) * quantity;
            this.currentShip.updateCash(revenue);
            this.currentShip.updateQty(itemName, quantity * -1);
            this.cuurentMarketplace.updateQty(itemName, quantity);
            return true;
        }
        return false;
    }
};

let gameHandler = new GameHandler();
let ship = new Ship();
let marketplace = new Marketplace();

ship.setGameHandler(gameHandler);


let wish = require('wish');
let deepEqual = require('deep-equal');

describe('setCurrentShip()', function(){
    it('sets ship to current ship', function(){
        wish(deepEqual(gameHandler.setCurrentShip(ship), {_items: [ { resource: 'Water', quantity: 10 } ],
                                                    _cash: 1000,
                                                    gameHandler: gameHandler }));
    });
});

describe('setCurrentMarketplace()', function(){
    it('sets current marketplace', function(){
        wish(deepEqual(gameHandler.setCurrentMarketplace(marketplace), 
                {_items: [  {resource:'Thorium', price: 200, quantity: 20},
                            {resource: 'Helium', price: 100, quantity: 5 }   ]}));
    });
});

describe('currentShip.getCash()', function(){
    it('gets the ship cash', function(){
        wish(gameHandler.currentShip.getCash() === 1000);
    });
});

describe('buyingItem()', function(){
    it('adds quantity of item to ship and charges the cost', function(){
        let shipCashBefore = gameHandler.currentShip.getCash();
        let marketQtyBefore = gameHandler.cuurentMarketplace.getQuantity('Helium');
        wish(gameHandler.buyingItem('Helium', 5) === true);
        wish(deepEqual(gameHandler.currentShip.getItems(),  [ { resource: 'Water', quantity: 10 },
                                                              { resource: 'Helium', quantity: 5 }] ));
        wish(shipCashBefore - 500 === gameHandler.currentShip.getCash());
        wish(marketQtyBefore - 5 === gameHandler.cuurentMarketplace.getQuantity('Helium'));
    });
});

describe('sellingItem()', function(){
    it('sells ship items to the Marketplace', function(){
        let shipCashBefore = gameHandler.currentShip.getCash();
        const thorium = {resource: 'Thorium', quantity: 1};
        ship.addItem({resource: 'Thorium', quantity: 1});
        let marketQtyBefore = gameHandler.cuurentMarketplace.getQuantity('Thorium');
        let shipQtyBefore = gameHandler.currentShip.getQuantity('Thorium');

        wish(gameHandler.sellingItem(thorium.resource, thorium.quantity) === true);
        wish(gameHandler.currentShip.getCash() - shipCashBefore === gameHandler.cuurentMarketplace.getPrice('Thorium'));
        wish(gameHandler.cuurentMarketplace.getQuantity('Thorium') - 1  === marketQtyBefore);
        wish(gameHandler.currentShip.getQuantity('Thorium') + 1  === shipQtyBefore);
    });
});

