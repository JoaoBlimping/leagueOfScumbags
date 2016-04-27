///<reference path="Weapon.ts"/>

module Scumbag
{
  /** shoots out some kind of bullet */
  export class Gun extends Weapon
  {
    nextFire    = 0;
    bulletSpeed = 600;
    fireRate    = 100;

    /** creates the gun */
    constructor(game:Phaser.Game,parent:Phaser.Group)
    {
      super(game,parent);
      for (let i = 0;i < 64;i++) this.add(new Bullet(game,'bullet1'),true);
      this.setAll('tracking', true);
    }


    fire(source:Phaser.Sprite)
    {
      if (this.game.time.time < this.nextFire) return;

      var x = source.x + 10;
      var y = source.y + 10;

      this.getFirstExists(false).fire(x,y,source.angle,this.bulletSpeed,0,500);

      this.nextFire = this.game.time.time + this.fireRate;
    }
  }
}
