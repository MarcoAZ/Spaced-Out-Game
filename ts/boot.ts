const config = {
    width: 800,
    height: 600,
    renderer: Phaser.AUTO,
    antialias: true,
    multiTexture: true,
    state:{
        preload: this.preload,
        create: this.create,
        update: this.update
    }
};

module Spaced {

    export class Game extends Phaser.Game {
    
        constructor() {

            super(config);

            this.state.add('app', App, false);
            this.state.start('app');

        }

    };
};


window.onload = () => {
    let game = new Spaced.Game();
}