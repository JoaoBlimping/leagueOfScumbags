///<reference path="GuiState.ts"/>


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


    /** overrides Phaser.State.create() */
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
      this.player = new PlayerActor(this.game,160,160,'chad',
                              this.tilemap.tileWidth,
                              this.tilemap.tileHeight);
      this.actors.add(this.player);
      this.game.camera.follow(this.player);

      //create the top layer of the world
      this.tilemap.createLayer("overhead");

      //load the script
      Script.setScript('test');
    }


    /** overrides Phaser.State.render() */
    render()
    {
      //this.game.debug.body(this.player);
      //this.game.debug.bodyInfo(this.player,32,32);
    }


    /** overrides GuiState.postGuiUpdate() */
    postGuiUpdate()
    {
      //check collisions between the player and the level
      this.game.physics.arcade.collide(this.actors,this.collisionLayer,
                                       hitLevel);
    }


    /** overrides GuiState.onGuiStart() */
    onGuiStart() {this.actors.setAll('updating',false)}


    /** overrides GuiState.onGuiEnd() */
    onGuiEnd() {this.actors.setAll('updating',true)}
  }


  /** what happens when an actor hits the level */
  function hitLevel(actor:Actor)
  {
    let directionPoint = directionToPoint(actor.directions[0]);
    actor.body.x -= directionPoint.x;
    actor.body.y -= directionPoint.y;
    actor.changeDirection();
  }
}
