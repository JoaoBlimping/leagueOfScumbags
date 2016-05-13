module Scumbag
{
  /** a background that displays some groovy shader
   * they'll probably have to be pretty conservative due to resource constraints
   * but anyway, it's fun putting them in */
  export class ShaderBackground extends Background
  {
    filter:   Phaser.Filter;

    constructor(game:Phaser.Game,key:string)
    {
      super(game);

      this.filter = new Phaser.Filter(game, null,game.cache.getShader(key));
      this.filter.setResolution(game.width,game.height);
      this.filters = [this.filter];
    }

    update():void
    {
      this.filter.update(this.game.input.activePointer);
    }
  }
}
