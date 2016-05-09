///<reference path="Weapon.ts"/>

module Scumbag
{
  /** shoots out some kind of bullet */
  export class Explosion extends Weapon
  {
    bulletSpeed = 400;
    bulletGravity = 600;
    bulletLifespan = 2000;

    nBullets:number;

    /** creates the gun */
    constructor(game:Phaser.Game,parent:Phaser.Group,bulletLimit:number,
                nBullets:number)
    {
      super(game,parent,0,0);
      for (let i = 0;i < bulletLimit;i++)
      {
        this.add(new Bullet(game,'bullet2'),true);
      }
      this.nBullets = nBullets;
    }


    fire(source:Phaser.Sprite)
    {
      for (let i = 0;i < 10;i++)
      {
        let angle = Math.random() * 2 * Math.PI - Math.PI;
        this.launchBullet(source.x,source.y,angle,this.bulletSpeed,0,
                          this.bulletGravity,this.bulletLifespan);
      }
    }
  }
}
