var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var config = {
    width: 800,
    height: 600,
    renderer: Phaser.AUTO,
    antialias: true,
    multiTexture: true,
    state: {
        preload: this.preload,
        create: this.create,
        update: this.update
    }
};
var Spaced;
(function (Spaced) {
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super.call(this, config) || this;
            _this.state.add('app', Spaced.App, false);
            _this.state.start('app');
            return _this;
        }
        return Game;
    }(Phaser.Game));
    Spaced.Game = Game;
    ;
})(Spaced || (Spaced = {}));
;
window.onload = function () {
    var game = new Spaced.Game();
};
//# sourceMappingURL=boot.js.map