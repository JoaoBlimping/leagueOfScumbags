///<reference path="phaser/phaser.d.ts"/>


module Scumbag
{
  export class Preloader extends Phaser.State
  {
    preloadBar: Phaser.Sprite;
    background: Phaser.Sprite;

    preload()
    {
      //Set up our preloader sprites
      this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
      this.background = this.add.sprite(0,0,'preloadBackground');

      //set the preload bar as a preload bar
      this.load.setPreloadSprite(this.preloadBar);

      //Load our actual games assets
      this.game.load.pack("main","pack.json");
    }

    create()
    {
      var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
      tween.onComplete.add(this.startMainMenu, this);
    }

    startMainMenu()
    {
      this.game.state.start('MainMenu', true, false);
    }
  }
}
