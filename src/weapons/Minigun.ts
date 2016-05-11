///<reference path="Weapon.ts"/>

module Scumbag
{
  /** shoots out some kind of bullet */
  export class Minigun extends Weapon
  {
    bulletSpeed = 800;
    gravity     = 300;
    lifespan    = 5000;

    /** creates the gun */
    constructor(game:Phaser.Game,parent:Phaser.Group)
    {
      super(game,parent,100,0.3);

      //create the future bullets
      for (let i = 0;i < 50;i++) this.add(new Bullet(game,'bullet2'),true);
    }


    fire(source:Phaser.Sprite)
    {
      this.launchBullet(source.x,source.y,source.angle + (Math.random() * 0.4) - 0.2 ,this.bulletSpeed,0,
                        this.gravity,this.lifespan);
    }
  }
}