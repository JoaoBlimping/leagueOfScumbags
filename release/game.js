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
    var Bullet = (function (_super) {
        __extends(Bullet, _super);
        function Bullet(game, key) {
            _super.call(this, game, 0, 0, key);
            this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
            this.anchor.set(0.5);
            this.checkWorldBounds = true;
            this.outOfBoundsKill = true;
            this.exists = false;
            this.tracking = false;
            this.scaleSpeed = 0;
        }
        Bullet.prototype.fire = function (x, y, angle, speed, gx, gy) {
            gx = gx || 0;
            gy = gy || 0;
            this.reset(x, y);
            this.scale.set(1);
            this.game.physics.arcade.velocityFromRotation(angle, speed, this.body.velocity);
            this.angle = angle;
            this.body.gravity.set(gx, gy);
        };
        Bullet.prototype.update = function () {
            if (this.tracking) {
                this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
            }
            if (this.scaleSpeed > 0) {
                this.scale.x += this.scaleSpeed;
                this.scale.y += this.scaleSpeed;
            }
        };
        return Bullet;
    }(Phaser.Sprite));
    Scumbag.Bullet = Bullet;
    function hitLevel(bullet) {
        bullet.kill();
    }
    Scumbag.hitLevel = hitLevel;
    function hitFighter(bullet, fighter) {
        bullet.kill();
        fighter.kill();
    }
    Scumbag.hitFighter = hitFighter;
})(Scumbag || (Scumbag = {}));
var Scumbag;
(function (Scumbag) {
    var Controller = (function () {
        function Controller(game) {
            this.game = game;
        }
        return Controller;
    }());
    Scumbag.Controller = Controller;
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
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.tilemap = this.add.tilemap('map1');
            this.tilemap.addTilesetImage('combatTiles', 'combatTiles');
            this.tilemap.createLayer("background");
            this.collisionLayer = this.tilemap.createLayer("collisions");
            this.tilemap.setLayer(this.collisionLayer);
            this.tilemap.setCollisionBetween(0, 6569);
            this.collisionLayer.resizeWorld();
            this.bullets = this.game.add.group();
            this.fighters = this.game.add.group();
            this.player = new Scumbag.Fighter(this.game, this.game.camera.width / 2, this.game.world.height / 2, 'dude', new Scumbag.Gun(this.game, this.bullets));
            this.fighters.add(this.player);
            this.game.camera.follow(this.player);
        };
        Fight.prototype.update = function () {
            this.game.physics.arcade.collide(this.fighters, this.collisionLayer);
            for (var _i = 0, _a = this.bullets.children; _i < _a.length; _i++) {
                var child = _a[_i];
                if (child instanceof Phaser.Group) {
                    this.game.physics.arcade.collide(child, this.collisionLayer, Scumbag.hitLevel);
                    this.game.physics.arcade.collide(child, this.fighters, Scumbag.hitFighter);
                }
            }
        };
        Fight.prototype.render = function () {
            this.game.debug.bodyInfo(this.player, 10, 10);
        };
        return Fight;
    }(Phaser.State));
    Scumbag.Fight = Fight;
})(Scumbag || (Scumbag = {}));
var Scumbag;
(function (Scumbag) {
    var Fighter = (function (_super) {
        __extends(Fighter, _super);
        function Fighter(game, x, y, key, weapon) {
            _super.call(this, game, x, y, key);
            this.game.physics.arcade.enable(this);
            this.body.gravity.y = 400;
            this.body.collideWorldBounds = true;
            this.anchor.setTo(0.5, 0.5);
            this.animations.add('up', [0, 1, 2], 10, true);
            this.animations.add('upright', [3, 4, 5], 10, true);
            this.animations.add('right', [6, 7, 8], 10, true);
            this.animations.add('downright', [9, 10, 11], 10, true);
            this.animations.add('down', [12, 13, 14], 10, true);
            this.moveSpeed = 200;
            this.jumpHeight = 400;
            this.controller = new Scumbag.PlayerController(this.game);
            this.weapon = weapon;
            game.add.existing(this);
        }
        Fighter.prototype.update = function () {
            this.body.velocity.x = 0;
            this.controller.control(this);
            if (this.body.velocity.x != 0) {
                var animationAngle = this.angle;
                if (this.body.velocity.x < 0) {
                    this.scale.x = -1;
                    if (animationAngle > 0)
                        animationAngle = (animationAngle - Math.PI) * -1;
                    else
                        animationAngle = (animationAngle + Math.PI) * -1;
                }
                else {
                    this.scale.x = 1;
                }
                if (animationAngle > (3 * Math.PI / 8))
                    this.animations.play('down');
                else if (animationAngle > Math.PI / 8)
                    this.animations.play('downright');
                else if (animationAngle > 0 - Math.PI / 8)
                    this.animations.play('right');
                else if (animationAngle > 0 - (3 * Math.PI / 8))
                    this.animations.play('upright');
                else
                    this.animations.play('up');
            }
            else {
                this.animations.currentAnim.stop();
            }
        };
        Fighter.prototype.move = function (angle) {
            this.angle = angle;
            this.body.velocity.x = this.moveSpeed * Math.cos(angle);
        };
        Fighter.prototype.jump = function () {
            if (this.body.blocked.down) {
                this.body.velocity.y = 0 - this.jumpHeight;
            }
            if (this.body.blocked.left) {
                this.body.velocity.x += this.jumpHeight / 2;
                this.body.velocity.y = 0 - this.jumpHeight;
            }
            if (this.body.blocked.right) {
                this.body.velocity.x += this.jumpHeight / 2;
                this.body.velocity.y = 0 - this.jumpHeight;
            }
        };
        Fighter.prototype.attack = function () {
            this.weapon.fire(this);
        };
        return Fighter;
    }(Phaser.Sprite));
    Scumbag.Fighter = Fighter;
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
    var num = 0;
    var Weapon = (function (_super) {
        __extends(Weapon, _super);
        function Weapon(game, parent) {
            _super.call(this, game, parent, 'G' + (num++), false, true, Phaser.Physics.ARCADE);
        }
        return Weapon;
    }(Phaser.Group));
    Scumbag.Weapon = Weapon;
})(Scumbag || (Scumbag = {}));
var Scumbag;
(function (Scumbag) {
    var Gun = (function (_super) {
        __extends(Gun, _super);
        function Gun(game, parent) {
            _super.call(this, game, parent);
            this.nextFire = 0;
            this.bulletSpeed = 600;
            this.fireRate = 100;
            for (var i = 0; i < 64; i++)
                this.add(new Scumbag.Bullet(game, 'bullet1'), true);
            this.setAll('tracking', true);
        }
        Gun.prototype.fire = function (source) {
            if (this.game.time.time < this.nextFire)
                return;
            var x = source.x + 10;
            var y = source.y + 10;
            this.getFirstExists(false).fire(x, y, source.angle, this.bulletSpeed, 0, 500);
            this.nextFire = this.game.time.time + this.fireRate;
        };
        return Gun;
    }(Scumbag.Weapon));
    Scumbag.Gun = Gun;
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
            this.game.input.keyboard.createCursorKeys();
            this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
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
    var PlayerController = (function (_super) {
        __extends(PlayerController, _super);
        function PlayerController() {
            _super.apply(this, arguments);
        }
        PlayerController.prototype.control = function (controlled) {
            var x = 0, y = 0;
            {
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
                    x = -1;
                else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
                    x = 1;
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
                    y = -1;
                else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
                    y = 1;
                if (x != 0 || y != 0) {
                    var angle = Math.atan2(y, x);
                    controlled.move(angle);
                }
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) {
                controlled.jump();
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.CONTROL)) {
                controlled.attack();
            }
        };
        return PlayerController;
    }(Scumbag.Controller));
    Scumbag.PlayerController = PlayerController;
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