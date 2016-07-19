///<reference path="Weapon.ts"/>

module Scumbag
{
  const bulletSpeed = 600;
  const lifespan    = 300;
  const wait        = 100;

  export namespace Weapons
  {

    /** shoots out some kind of bullet */
    export class Bouncy extends Weapon
    {
      /** creates the gun */
      constructor(game:Phaser.Game,parent:Phaser.Group,master:Fighter)
      {
        super(game,parent,wait,0.35,master);

        //create the future bullets
        for (let i = 0;i < 32;i++) this.add(new Bullet(game,'bullet7'),true);
        this.setAll('tracking',true);
        this.setAll('power',3);
        this.setAll('bouncy',true);
        this.setAll('body.bounce.x',1);
        this.setAll('body.bounce.y',1);
      }


      fire(source:Phaser.Sprite)
      {
        let gX = Math.random() * 500 - 250;
        let gY = Math.random() * 500 - 250;
        this.launchBullet(source.x,source.y,source.angle,bulletSpeed,gX,gY,lifespan);
      }
    }
  }
}
