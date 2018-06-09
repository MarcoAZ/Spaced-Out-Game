import {ShipModule} from './ship'
class GameHandler {
    constructor(){
        
    }

    ship = new ShipModule.Ship();
}



let gameHandler = new GameHandler();
console.log(gameHandler.ship);

let wish = require('wish');
let deepEqual = require('deep-equal');

describe('test GameHandler uses new ship', function(){
    it('gets the ship cash', function(){
        wish(gameHandler.ship.getCash() === 0);
    });
});