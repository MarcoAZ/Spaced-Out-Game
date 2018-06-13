import {Ship} from './ship';
import { Marketplace } from './marketplace';

export enum locations {
    "Start",
    'Kandinsky Station'
}

export class GameHandler {
    currentShip;
    currentMarketplace;
    gameLocations = [];

    constructor(){
        this.currentShip = {};
        this.createMarkets(); 
    }

    setCurrentMarketplace(marketplace: Marketplace){
        this.currentMarketplace = marketplace;
        return this.currentMarketplace;
        
    }

    setCurrentShip(ship: Ship){
        this.currentShip = ship;
        return this.currentShip;
    }

    createMarkets(){
        for(let market in Object.keys(locations))
        {
            if(locations[market] != undefined){
                let newMarket = new Marketplace(locations[market]);
                this.gameLocations.push(newMarket);
            }
        }
        return this.gameLocations;
    }

    buyingItem(itemName: string, quantity: number){
        if(quantity <= this.currentMarketplace.getQuantity(itemName)){
            const cost = this.currentMarketplace.getPrice(itemName) * quantity;
            if(cost <= this.currentShip.getCash()){
                if(this.currentShip.getItem(itemName).resource === null){
                    this.currentShip.addItem({resource: itemName, quantity: quantity});
                }
                else{
                    this.currentShip.updateQty(itemName, quantity);
                }
                this.currentShip.updateCash(cost * -1);
                this.currentMarketplace.updateQty(itemName, quantity * -1);
                return true;
            }
        }
        return false;
    }

    sellingItem(itemName: string, quantity: number){
        if(quantity <= this.currentShip.getQuantity(itemName) && quantity > 0){
            const revenue = this.currentMarketplace.getPrice(itemName) * quantity;
            this.currentShip.updateCash(revenue);
            this.currentShip.updateQty(itemName, quantity * -1);
            this.currentMarketplace.updateQty(itemName, quantity);
            return true;
        }
        return false;
    }

};