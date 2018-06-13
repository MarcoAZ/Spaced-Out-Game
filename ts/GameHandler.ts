import {Ship} from './ship';
import { Marketplace } from './marketplace';

export enum locations {
    start = "Start",
    kandinsky = 'Kandinsky Station'
}

export class GameHandler {
    currentShip;
    cuurentMarketplace;
    gameLocations;

    constructor(){
        this.currentShip = {};
        this.gameLocations = [];
    }

    setCurrentMarketplace(marketplace: Marketplace){
        this.cuurentMarketplace = marketplace;
        return this.cuurentMarketplace;
        
    }

    setCurrentShip(ship: Ship){
        this.currentShip = ship;
        return this.currentShip;
    }

    createMarkets(){
        for(let market in Object.keys(locations))
        {
            this.gameLocations.push(market);
        }
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