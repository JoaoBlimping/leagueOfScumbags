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
    player:           Fighter;
    bullets:          Phaser.Group;


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
                                new Gun(this.game,this.bullets));
      this.fighters.add(this.player);
      this.game.camera.follow(this.player);
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
          this.game.physics.arcade.collide(child,this.collisionLayer,hitLevel);
          this.game.physics.arcade.collide(child,this.fighters,hitFighter);
        }
      }
    }


    render()
    {
      this.game.debug.bodyInfo(this.player,10,10);
    }
  }
}
