var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Scumbag;
(function (Scumbag) {
    (function (Direction) {
        Direction[Direction["up"] = 0] = "up";
        Direction[Direction["down"] = 1] = "down";
        Direction[Direction["left"] = 2] = "left";
        Direction[Direction["right"] = 3] = "right";
        Direction[Direction["static"] = 4] = "static";
    })(Scumbag.Direction || (Scumbag.Direction = {}));
    var Direction = Scumbag.Direction;
    function directionToPoint(direction) {
        if (direction == 0)
            return { x: 0, y: -1 };
        else if (direction == 1)
            return { x: 0, y: 1 };
        else if (direction == 2)
            return { x: -1, y: 0 };
        else if (direction == 3)
            return { x: 1, y: 0 };
        else
            return { x: 0, y: 0 };
    }
    Scumbag.directionToPoint = directionToPoint;
    function logDirection(direction) {
        if (direction == 0)
            console.log("up");
        else if (direction == 1)
            console.log("down");
        else if (direction == 2)
            console.log("left");
        else if (direction == 3)
            console.log("right");
        else
            console.log("static");
    }
    Scumbag.logDirection = logDirection;
})(Scumbag || (Scumbag = {}));
var Scumbag;
(function (Scumbag) {
    var Actor = (function (_super) {
        __extends(Actor, _super);
        function Actor(game, x, y, key) {
            _super.call(this, game, x, y, key);
            this.targetX = -1;
            this.targetY = -1;
            this.game.physics.arcade.enable(this);
            this.body.collideWorldBounds = true;
            this.body.height = this.body.halfHeight;
            this.anchor.setTo(0.5, 1);
            this.animations.add('down', [0, 1, 2, 3], 10, true);
            this.animations.add('right', [4, 5, 6, 7], 10, true);
            this.animations.add('left', [8, 9, 10, 11], 10, true);
            this.animations.add('up', [12, 13, 14, 15], 10, true);
            this.moveSpeed = 80;
            this.directions = [1, 3];
            game.add.existing(this);
        }
        Actor.prototype.update = function () {
            var inTileX = this.body.x / 32;
            var inTileY = this.body.y / 32;
            var directionPoint = Scumbag.directionToPoint(this.directions[0]);
            if (this.targetX == -1 || this.targetY == -1) {
                this.targetX = Math.round(inTileX) + directionPoint.x;
                this.targetY = Math.round(inTileY) + directionPoint.y;
            }
            this.body.velocity.x = directionPoint.x * this.moveSpeed;
            this.body.velocity.y = directionPoint.y * this.moveSpeed;
            console.log(this.targetX + ',' + inTileX + ' ' + this.targetY + ',' + inTileY);
            if (inTileX - this.targetX > -0.10 && inTileX - this.targetX < 0.10 &&
                inTileY - this.targetY > -0.10 && inTileY - this.targetY < 0.10) {
                this.changeDirection();
            }
            if (this.directions[0] == 0)
                this.animations.play("up");
            if (this.directions[0] == 2)
                this.animations.play("left");
            if (this.directions[0] == 3)
                this.animations.play("right");
            if (this.directions[0] == 1)
                this.animations.play("down");
        };
        Actor.prototype.changeDirection = function () {
            this.directions = this.directions.slice(1).concat(this.directions[0]);
            this.directions = this.directions.concat(this.directions.pop());
            this.targetX = -1;
            this.targetY = -1;
        };
        return Actor;
    }(Phaser.Sprite));
    Scumbag.Actor = Actor;
})(Scumbag || (Scumbag = {}));
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
        function Bullet(game, key, deathGun) {
            _super.call(this, game, 0, 0, key);
            this.tracking = false;
            this.collide = true;
            this.scaleSpeed = 0;
            this.power = 1;
            this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
            this.anchor.set(0.5);
            this.checkWorldBounds = true;
            this.outOfBoundsKill = true;
            this.exists = false;
            this.deathGun = deathGun;
        }
        Bullet.prototype.fire = function (x, y, angle, speed, gx, gy, lifespan) {
            gx = gx || 0;
            gy = gy || 0;
            this.reset(x, y);
            this.scale.set(1);
            this.game.physics.arcade.velocityFromRotation(angle, speed, this.body.velocity);
            this.angle = angle;
            this.body.gravity.set(gx, gy);
            this.lifespan = lifespan;
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
        Bullet.prototype.kill = function () {
            if (this.deathGun != undefined)
                this.deathGun.fire(this);
            return _super.prototype.kill.call(this);
        };
        return Bullet;
    }(Phaser.Sprite));
    Scumbag.Bullet = Bullet;
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
            this.player = new Scumbag.Fighter(this.game, this.game.camera.width / 2, this.game.world.height / 2, 'dude', new Scumbag.Nuke(this.game, this.bullets));
            this.fighters.add(this.player);
            this.game.camera.follow(this.player);
            this.healthBar = this.game.add.image(0, 0, 'healthBar');
            this.manaBar = this.game.add.image(0, 16, 'manaBar');
            this.healthBar.fixedToCamera = true;
            this.manaBar.fixedToCamera = true;
        };
        Fight.prototype.update = function () {
            this.game.physics.arcade.collide(this.fighters, this.collisionLayer);
            for (var _i = 0, _a = this.bullets.children; _i < _a.length; _i++) {
                var child = _a[_i];
                if (child instanceof Phaser.Group) {
                    this.game.physics.arcade.collide(child, this.collisionLayer, hitLevel, null, this);
                    this.game.physics.arcade.collide(child, this.fighters, hitFighter);
                }
            }
            this.healthBar.scale.x = this.player.health / this.player.maxHealth;
            this.manaBar.scale.x = this.player.mana / this.player.maxMana;
        };
        Fight.prototype.render = function () {
        };
        return Fight;
    }(Phaser.State));
    Scumbag.Fight = Fight;
    function hitLevel(bullet, tile) {
        if (bullet.collide) {
            bullet.kill();
            if (tile.properties.destructible == 1) {
                this.tilemap.removeTile(tile.x, tile.y, this.collisionLayer);
            }
            return false;
        }
        return true;
    }
    function hitFighter(bullet, fighter) {
        if (!bullet.collide)
            return false;
        fighter.damage(bullet.power);
        bullet.kill();
        return true;
    }
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
            this.maxHealth = 10;
            this.health = 10;
            this.healthRegen = 0;
            this.healthRegenRate = 1000;
            this.maxMana = 10;
            this.mana = 10;
            this.manaRegen = 0;
            this.manaRegenRate = 1000;
            this.prevTime = this.game.time.time;
            game.add.existing(this);
        }
        Fighter.prototype.update = function () {
            var newTime = this.game.time.time;
            var elapsedTime = newTime - this.prevTime;
            this.healthRegen += elapsedTime;
            this.manaRegen += elapsedTime;
            while (this.healthRegen > this.healthRegenRate) {
                if (this.health < this.maxHealth)
                    this.health++;
                this.healthRegen -= this.healthRegenRate;
            }
            while (this.manaRegen > this.manaRegenRate) {
                if (this.mana < this.maxMana)
                    this.mana++;
                this.manaRegen -= this.manaRegenRate;
            }
            this.prevTime = newTime;
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
                this.body.velocity.x -= this.jumpHeight / 2;
                this.body.velocity.y = 0 - this.jumpHeight;
            }
        };
        Fighter.prototype.attack = function () {
            var currentTime = this.game.time.time;
            if (currentTime < this.canFireTime || this.mana < this.weapon.manaCost)
                return;
            this.weapon.fire(this);
            this.canFireTime = currentTime + this.weapon.wait;
            this.mana -= this.weapon.manaCost;
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
            this.state.add('Overworld', Scumbag.Overworld, false);
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
            this.game.input.keyboard.createCursorKeys();
            this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
        };
        MainMenu.prototype.fadeOut = function () {
            this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        MainMenu.prototype.startGame = function () {
            this.game.state.start('Overworld', true, false);
        };
        return MainMenu;
    }(Phaser.State));
    Scumbag.MainMenu = MainMenu;
})(Scumbag || (Scumbag = {}));
var Scumbag;
(function (Scumbag) {
    var Overworld = (function (_super) {
        __extends(Overworld, _super);
        function Overworld() {
            _super.apply(this, arguments);
        }
        Overworld.prototype.create = function () {
            this.background = this.add.sprite(0, 0, 'titlepage');
            this.music = this.add.audio('music', 1, false);
            this.music.play();
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.tilemap = this.add.tilemap('map2');
            this.tilemap.addTilesetImage('outsideTiles', 'outsideTiles');
            this.tilemap.createLayer("background");
            this.collisionLayer = this.tilemap.createLayer('collisions');
            this.tilemap.setLayer(this.collisionLayer);
            this.tilemap.setCollisionBetween(0, 6569);
            this.collisionLayer.resizeWorld();
            this.actors = this.game.add.group();
            this.player = new Scumbag.Actor(this.game, 144, 144, 'chad');
            this.actors.add(this.player);
        };
        Overworld.prototype.update = function () {
            this.game.physics.arcade.collide(this.actors, this.collisionLayer, hitLevel);
        };
        Overworld.prototype.render = function () {
            this.game.debug.body(this.player);
            this.game.debug.bodyInfo(this.player, 32, 32);
        };
        return Overworld;
    }(Phaser.State));
    Scumbag.Overworld = Overworld;
    function hitLevel(actor) {
        console.log("collision");
        var directionPoint = Scumbag.directionToPoint(actor.directions[0]);
        actor.body.x -= directionPoint.x;
        actor.body.y -= directionPoint.y;
        actor.changeDirection();
    }
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
var Scumbag;
(function (Scumbag) {
    var num = 0;
    var Weapon = (function (_super) {
        __extends(Weapon, _super);
        function Weapon(game, parent, wait, manaCost) {
            _super.call(this, game, parent, 'G' + (num++), false, true, Phaser.Physics.ARCADE);
            this.wait = wait;
            this.manaCost = manaCost;
        }
        Weapon.prototype.launchBullet = function (x, y, angle, speed, gx, gy, lifespan) {
            var bullet = this.getFirstExists(false);
            if (bullet != null)
                bullet.fire(x, y, angle, speed, gx, gy, lifespan);
        };
        return Weapon;
    }(Phaser.Group));
    Scumbag.Weapon = Weapon;
})(Scumbag || (Scumbag = {}));
var Scumbag;
(function (Scumbag) {
    var Blaster = (function (_super) {
        __extends(Blaster, _super);
        function Blaster(game, parent) {
            _super.call(this, game, parent, 200, 1);
            this.bulletSpeed = 600;
            this.gravity = 500;
            this.lifespan = 5000;
            this.explosion = new Scumbag.Explosion(game, parent, 40, 10);
            for (var i = 0; i < 32; i++)
                this.add(new Scumbag.Bullet(game, 'bullet1', this.explosion), true);
            this.setAll('tracking', true);
        }
        Blaster.prototype.fire = function (source) {
            this.launchBullet(source.x, source.y, source.angle, this.bulletSpeed, 0, this.gravity, this.lifespan);
        };
        return Blaster;
    }(Scumbag.Weapon));
    Scumbag.Blaster = Blaster;
})(Scumbag || (Scumbag = {}));
var Scumbag;
(function (Scumbag) {
    var Explosion = (function (_super) {
        __extends(Explosion, _super);
        function Explosion(game, parent, bulletLimit, nBullets) {
            _super.call(this, game, parent, 0, 0);
            this.bulletSpeed = 400;
            this.bulletGravity = 600;
            this.bulletLifespan = 2000;
            for (var i = 0; i < bulletLimit; i++) {
                this.add(new Scumbag.Bullet(game, 'bullet2'), true);
            }
            this.nBullets = nBullets;
        }
        Explosion.prototype.fire = function (source) {
            for (var i = 0; i < 10; i++) {
                var angle = Math.random() * 2 * Math.PI - Math.PI;
                this.launchBullet(source.x, source.y, angle, this.bulletSpeed, 0, this.bulletGravity, this.bulletLifespan);
            }
        };
        return Explosion;
    }(Scumbag.Weapon));
    Scumbag.Explosion = Explosion;
})(Scumbag || (Scumbag = {}));
var Scumbag;
(function (Scumbag) {
    var Minigun = (function (_super) {
        __extends(Minigun, _super);
        function Minigun(game, parent) {
            _super.call(this, game, parent, 100, 0.3);
            this.bulletSpeed = 800;
            this.gravity = 300;
            this.lifespan = 5000;
            for (var i = 0; i < 50; i++)
                this.add(new Scumbag.Bullet(game, 'bullet2'), true);
        }
        Minigun.prototype.fire = function (source) {
            this.launchBullet(source.x, source.y, source.angle + (Math.random() * 0.4) - 0.2, this.bulletSpeed, 0, this.gravity, this.lifespan);
        };
        return Minigun;
    }(Scumbag.Weapon));
    Scumbag.Minigun = Minigun;
})(Scumbag || (Scumbag = {}));
var Scumbag;
(function (Scumbag) {
    var Nuke = (function (_super) {
        __extends(Nuke, _super);
        function Nuke(game, parent) {
            _super.call(this, game, parent, 1000, 7);
            this.bulletSpeed = 600;
            this.gravity = 500;
            this.lifespan = 2000;
            this.radioactivity = new Scumbag.Radioactivity(game, parent, 100);
            for (var i = 0; i < 10; i++)
                this.add(new Scumbag.Bullet(game, 'bullet4', this.radioactivity), true);
            this.setAll('collide', false);
            this.setAll('body.bounce.x', 0.5);
            this.setAll('body.bounce.y', 0.5);
        }
        Nuke.prototype.fire = function (source) {
            this.launchBullet(source.x, source.y, source.angle, this.bulletSpeed, 0, this.gravity, this.lifespan);
        };
        return Nuke;
    }(Scumbag.Weapon));
    Scumbag.Nuke = Nuke;
})(Scumbag || (Scumbag = {}));
var Scumbag;
(function (Scumbag) {
    var Radioactivity = (function (_super) {
        __extends(Radioactivity, _super);
        function Radioactivity(game, parent, particleLimit) {
            _super.call(this, game, parent, 0, 0);
            this.bulletSpeed = 400;
            this.bulletGravity = 600;
            this.bulletLifespan = 4000;
            this.explosion = new Scumbag.Explosion(game, parent, 300, 5);
            for (var i = 0; i < particleLimit; i++) {
                this.add(new Scumbag.Bullet(game, 'bullet3', this.explosion), true);
            }
            this.setAll('body.bounce.x', 0.9);
            this.setAll('body.bounce.y', 0.9);
            this.setAll('collide', false);
        }
        Radioactivity.prototype.fire = function (source) {
            for (var i = 0; i < 20; i++) {
                var angle = Math.random() * 2 * Math.PI - Math.PI;
                this.launchBullet(source.x, source.y, angle, this.bulletSpeed, 0, this.bulletGravity, this.bulletLifespan +
                    (Math.random() * 2000 - 500));
            }
        };
        return Radioactivity;
    }(Scumbag.Weapon));
    Scumbag.Radioactivity = Radioactivity;
})(Scumbag || (Scumbag = {}));
//# sourceMappingURL=game.js.map