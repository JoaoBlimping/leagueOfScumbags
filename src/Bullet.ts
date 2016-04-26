module Scumbag
{
  /** a bullet that gets shot about the place and stuff */
  export class Bullet extends Phaser.Sprite
  {
    tracking:boolean;
    scaleSpeed:number;

    /** constructs the bullet */
    constructor(game:Phaser.Game,key:string)
    {
      super(game,0,0,key);

      this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
      this.anchor.set(0.5);

      this.checkWorldBounds = true;
      this.outOfBoundsKill = true;
      this.exists = false;

      this.tracking = false;
      this.scaleSpeed = 0;
    }
  }
}
