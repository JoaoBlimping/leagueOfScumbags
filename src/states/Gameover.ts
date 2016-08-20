///<reference path="GuiState.ts"/>


module Scumbag
{
  export class Gameover extends GuiState
  {
    background:   Phaser.Sprite;
    logo:         Phaser.Sprite;

    /** overrides Phaser.State.create() */
    create()
    {
      this.game.camera.x = 0;
      this.game.camera.y = 0;

      this.background = this.add.sprite(0,0,'titlepage');
      this.background.alpha = 0;

      this.logo = this.add.sprite(this.game.width / 2,-300,'dead');
      this.logo.anchor.setTo(0.5,0.5);

      this.add.tween(this.background).to({alpha:1},500,Phaser.Easing.Default,true);
      this.add.tween(this.logo).to({y:this.game.height / 2 - this.logo.height / 2},700,Phaser.Easing.Elastic.In,true,500);

      //chuck on a sweet beat
      MusicManager.playSong(this.game,'deadMusic');

      //load the script
      Script.setScript(this.game.cache.getText("deadScript"));
    }


    /** overrides GuiState.postGuiUpdate() */
    postGuiUpdate() {}


    /** overrides GuiState.onGuiStart() */
    onGuiStart() {}


    /** overrides GuiState.onGuiEnd() */
    onGuiEnd() {}
  }
}
