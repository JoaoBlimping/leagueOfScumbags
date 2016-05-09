///<reference path="phaser/phaser.d.ts"/>


module Scumbag
{
  export class Fight extends Phaser.State
  {
    background:       Phaser.Sprite;
    music:            Phaser.Sound;
    tilemap:          Phaser.Tilemap;
    collisionLayer:   Phaser.TilemapLayer;
    fighters:         Phaser.Group;
    bullets:          Phaser.Group;
    player:           Fighter;
    healthBar:        Phaser.Image;
    manaBar:          Phaser.Image;


    create()
    {
      //create the background
      this.background = this.add.sprite(0, 0, 'titlepage');

      //load and play the music
      this.music = this.add.audio('music', 1, false);
      this.music.play();

      //turn on phyysics
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      //create the tilemap
      this.tilemap = this.add.tilemap('map1');
      this.tilemap.addTilesetImage('combatTiles','combatTiles');
      this.tilemap.createLayer("background");
      this.collisionLayer = this.tilemap.createLayer("collisions");
      this.tilemap.setLayer(this.collisionLayer);
      this.tilemap.setCollisionBetween(0, 6569);
      this.collisionLayer.resizeWorld();


      //make group for all the bullets
      this.bullets = this.game.add.group();

      //add the player and stuff
      this.fighters = this.game.add.group();
      this.player = new Fighter(this.game,this.game.camera.width / 2,
                                this.game.world.height / 2,'dude',
                                new Nuke(this.game,this.bullets));
      this.fighters.add(this.player);
      this.game.camera.follow(this.player);

      //create the health bar for the plauer and also the mana bar
      this.healthBar = this.game.add.image(0,0,'healthBar');
      this.manaBar = this.game.add.image(0,16,'manaBar');
      this.healthBar.fixedToCamera = true;
      this.manaBar.fixedToCamera = true;
    }


    update()
    {
      //check collisions between the player and the level
      this.game.physics.arcade.collide(this.fighters,this.collisionLayer);

      //check collisions between bullets and the level
      for (let child of this.bullets.children)
      {
        if (child instanceof Phaser.Group)
        {
          this.game.physics.arcade.collide(child,this.collisionLayer,hitLevel,null,this);
          this.game.physics.arcade.collide(child,this.fighters,hitFighter);
        }
      }

      //make the health bar right
      this.healthBar.scale.x = this.player.health / this.player.maxHealth;
      this.manaBar.scale.x = this.player.mana / this.player.maxMana;
    }


    render()
    {
      //this.game.debug.bodyInfo(this.player,0,32);
    }
  }

  /** this gets called when a bullet hits the level */
  function hitLevel(bullet:Bullet,tile:Phaser.Tile)
  {
    if (bullet.collide)
    {
      bullet.kill();

      if (tile.properties.destructible == 1)
      {
        this.tilemap.removeTile(tile.x,tile.y,this.collisionLayer);
        //tile.layer.dirty = true;
      }
      return false;
    }
    return true;
  }


  /** this gets called when a bullet hits a fighter */
  function hitFighter(bullet:Bullet,fighter:Fighter)
  {
    if (!bullet.collide) return false;

    fighter.damage(bullet.power);
    bullet.kill();
    return true;
  }
}
