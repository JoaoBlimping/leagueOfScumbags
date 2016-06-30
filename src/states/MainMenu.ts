///<reference path="GuiState.ts"/>


module Scumbag
{
  export class MainMenu extends GuiState
  {
    background:   Phaser.Sprite;
    logo:         Phaser.Sprite;

    /** overrides Phaser.State.create() */
    create()
    {
      this.background = this.add.sprite(0,0,'titlepage');
      this.background.alpha = 0;

      this.logo = this.add.sprite(this.world.centerX,-300,'logo');
      this.logo.anchor.setTo(0.5,0.5);

      this.add.tween(this.background).to({alpha:1},500,Phaser.Easing.Default,true);
      this.add.tween(this.logo).to({y:this.world.centerY - this.logo.height / 3},700,Phaser.Easing.Elastic.In,true,500);

      //chuck on a sweet beat
      MusicManager.playSong(this.game,'menuMusic');

      //initialise the controls
      InputManager.init(this.game);

      //load the script
      Script.init(this.game);
      Script.setScript('menuScript');
    }


    /** overrides GuiState.postGuiUpdate() */
    postGuiUpdate() {}


    /** overrides GuiState.onGuiStart() */
    onGuiStart() {}


    /** overrides GuiState.onGuiEnd() */
    onGuiEnd() {}
  }
}
