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

    setShip(ship: Ship){
        this.currentShip = ship;
        return this.currentShip;
    }


};

let gameHandler = new GameHandler();
let ship = new Ship();
let marketplace = new Marketplace();
ship.setGameHandler(gameHandler);


let wish = require('wish');
let deepEqual = require('deep-equal');

describe('setShip()', function(){
    it('sets ship to current ship', function(){
        wish(deepEqual(gameHandler.setShip(ship), {_items: [ { resource: 'Water', quantity: 10 } ],
                                                    _cash: 0,
                                                    gameHandler: gameHandler }));
    });
});

describe('currentShip.getCash()', function(){
    it('gets the ship cash', function(){
        wish(gameHandler.currentShip.getCash() === 0);
    });
});



