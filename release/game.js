var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Scumbag;
(function (Scumbag) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', 'assets/loader.png');
        };
        Boot.prototype.create = function () {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    }(Phaser.State));
    Scumbag.Boot = Boot;
})(Scumbag || (Scumbag = {}));
var Scumbag;
(function (Scumbag) {
    var Fight = (function (_super) {
        __extends(Fight, _super);
        function Fight() {
            _super.apply(this, arguments);
        }
        Fight.prototype.create = function () {
            this.background = this.add.sprite(0, 0, 'titlepage');
            this.music = this.add.audio('music', 1, false);
            this.music.play();
            this.tilemap = this.add.tilemap('map1');
            this.tilemap.addTilesetImage('combatTiles', 'combatTiles');
            var background = this.tilemap.createLayer("background");
            background.scrollFactorX = 0.5;
            background.scrollFactorY = 0.5;
            var layer = this.tilemap.createLayer("collisions");
            this.tilemap.setLayer(layer);
            this.tilemap.setCollisionBetween(0, 6569);
            layer.resizeWorld();
        };
        return Fight;
    }(Phaser.State));
    Scumbag.Fight = Fight;
})(Scumbag || (Scumbag = {}));
var Scumbag;
(function (Scumbag) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 1152, 528, Phaser.AUTO, 'content', null);
            this.state.add('Boot', Scumbag.Boot, false);
            this.state.add('Preloader', Scumbag.Preloader, false);
            this.state.add('MainMenu', Scumbag.MainMenu, false);
            this.state.add('Fight', Scumbag.Fight, false);
            this.state.start('Boot');
        }
        return Game;
    }(Phaser.Game));
    Scumbag.Game = Game;
})(Scumbag || (Scumbag = {}));
var Scumbag;
(function (Scumbag) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            this.background = this.add.sprite(0, 0, 'titlepage');
            this.background.alpha = 0;
            this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);
            this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
            this.add.tween(this.logo).to({ y: 220 }, 2000, Phaser.Easing.Elastic.Out, true, 2000);
            this.input.onDown.addOnce(this.fadeOut, this);
        };
        MainMenu.prototype.fadeOut = function () {
            this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        MainMenu.prototype.startGame = function () {
            this.game.state.start('Fight', true, false);
        };
        return MainMenu;
    }(Phaser.State));
    Scumbag.MainMenu = MainMenu;
})(Scumbag || (Scumbag = {}));
var Scumbag;
(function (Scumbag) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            _super.call(this, game, x, y, 'simon', 0);
            this.anchor.setTo(0.5, 0);
            this.animations.add('walk', [0, 1, 2, 3, 4], 10, true);
            game.add.existing(this);
        }
        Player.prototype.update = function () {
            this.body.velocity.x = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -150;
                this.animations.play('walk');
                if (this.scale.x == 1) {
                    this.scale.x = -1;
                }
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.body.velocity.x = 150;
                this.animations.play('walk');
                if (this.scale.x == -1) {
                    this.scale.x = 1;
                }
            }
            else {
                this.animations.frame = 0;
            }
        };
        return Player;
    }(Phaser.Sprite));
    Scumbag.Player = Player;
})(Scumbag || (Scumbag = {}));
var Scumbag;
(function (Scumbag) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.background = this.add.sprite(0, 0, 'preloadBackground');
            this.load.setPreloadSprite(this.preloadBar);
            this.game.load.pack("main", "pack.json");
        };
        Preloader.prototype.create = function () {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        };
        Preloader.prototype.startMainMenu = function () {
            this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    }(Phaser.State));
    Scumbag.Preloader = Preloader;
})(Scumbag || (Scumbag = {}));
//# sourceMappingURL=game.js.map