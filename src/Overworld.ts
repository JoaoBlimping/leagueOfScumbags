///<reference path="phaser/phaser.d.ts"/>


module Scumbag
{
  /** the scene in which you walk around and most of the storyline takes
   * place */
  export class Overworld extends GuiState
  {
    background:       Phaser.Sprite;
    music:            Phaser.Sound;
    tilemap:          Phaser.Tilemap;
    collisionLayer:   Phaser.TilemapLayer;
    actors:           Phaser.Group;
    player:           Actor;


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
      this.tilemap = this.add.tilemap('map2');
      this.tilemap.addTilesetImage('outsideTiles','outsideTiles');
      this.tilemap.createLayer("background");
      this.collisionLayer = this.tilemap.createLayer('collisions');
      this.tilemap.setLayer(this.collisionLayer);
      this.tilemap.setCollisionBetween(0, 6569);
      this.collisionLayer.resizeWorld();

      //add player and stuff
      this.actors = this.game.add.group();
      this.player = new Actor(this.game,144,144,'chad',
                              this.tilemap.tileWidth,
                              this.tilemap.tileHeight);
      this.actors.add(this.player);

      //load the script
      Script.setScript(this.game,'test');
    }


    render()
    {
      this.game.debug.body(this.player);
      this.game.debug.bodyInfo(this.player,32,32);
    }


    postGuiUpdate()
    {
      //check collisions between the player and the level
      this.game.physics.arcade.collide(this.actors,this.collisionLayer,
                                       hitLevel);
    }


    onGuiStart() {this.actors.setAll('updating',false)}


    onGuiEnd() {this.actors.setAll('updating',true)}
  }


  /** when an actor hits the level */
  function hitLevel(actor:Actor)
  {
    let directionPoint = directionToPoint(actor.directions[0]);
    actor.body.x -= directionPoint.x;
    actor.body.y -= directionPoint.y;
    actor.changeDirection();
  }
}
