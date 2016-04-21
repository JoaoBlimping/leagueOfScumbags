///<reference path="phaser/phaser.d.ts"/>


module Scumbag
{
  export class Fight extends Phaser.State
  {
    background: Phaser.Sprite;
    music: Phaser.Sound;
    tilemap: Phaser.Tilemap;
    niceGroup: Phaser.Group;
    player: Phaser.Sprite;

    create()
    {
      //create the background
      this.background = this.add.sprite(0, 0, 'titlepage');

      //load and play the music
      this.music = this.add.audio('music', 1, false);
      this.music.play();

      //create the tilemap
      this.tilemap = this.add.tilemap('map1');
      this.tilemap.addTilesetImage('combatTiles','combatTiles');
      let background = this.tilemap.createLayer("background");
      background.scrollFactorX = 0.5;
      background.scrollFactorY = 0.5;
      let layer = this.tilemap.createLayer("collisions");
      this.tilemap.setLayer(layer);
      this.tilemap.setCollisionBetween(0, 6569);
      layer.resizeWorld();

      //add the player and stuff
      this.niceGroup = this.game.add.group();
      this.player = this.game.add.sprite(this.game.camera.width / 2,
                                         this.game.world.height / 2,'dude');
      this.game.camera.follow(this.player);

      //  We need to enable physics on the player
      this.game.physics.arcade.enable(this.player);

      //  make this fiend bounce
      this.player.body.bounce.y = 0.3;
      this.player.body.gravity.y = 200;
      this.player.body.collideWorldBounds = true;
    }
  }
}
