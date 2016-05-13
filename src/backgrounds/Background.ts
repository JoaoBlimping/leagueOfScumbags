module Scumbag
{
  export abstract class Background extends Phaser.Image
  {
    constructor(game:Phaser.Game)
    {
      super(game,0,0,"");
      this.width = game.width;
      this.height = game.height;
    }

    abstract update():void;
  }
}
