
///<reference path="Weapon.ts"/>

module Scumbag
{
  const bulletSpeed = 400;
  const bulletGravity = 600;
  const bulletLifespan = 300;
  const nBullets = 10;

  export namespace Weapons
  {
    /** shoots out some kind of bullet */
    export class Blood extends Weapon
    {

      /** creates the gun */
      constructor(game:Phaser.Game,parent:Phaser.Group,master:Fighter)
      {
        super(game,parent,0,0,master);
        for (let i = 0;i < nBullets;i++)
        {
          this.add(new Bullet(game,'blood'+Math.ceil(Math.random()*2)),true);
        }
        this.setAll('collide',false);
      }


      fire(source:Phaser.Sprite)
      {
        for (let i = 0;i < 10;i++)
        {
          let angle = Math.random() * 2 * Math.PI - Math.PI;
          this.launchBullet(source.x,source.y,angle,bulletSpeed,0,bulletGravity,bulletLifespan);
        }
      }
    }
  }
}
