///<reference path="Weapon.ts"/>

module Scumbag
{
  /** shoots out some kind of bullet */
  export class Radioactivity extends Weapon
  {
    bulletSpeed = 400;
    bulletGravity = 600;
    bulletLifespan = 4000;

    explosion:  Explosion;

    /** creates the gun */
    constructor(game:Phaser.Game,parent:Phaser.Group,particleLimit:number)
    {
      super(game,parent,0,0);

      //create the explosion maker
      this.explosion = new Explosion(game,parent,300,5);

      //create the radioactive things
      for (let i = 0;i < particleLimit;i++)
      {
        this.add(new Bullet(game,'bullet3',this.explosion),true);
      }
      this.setAll('body.bounce.x',0.9);
      this.setAll('body.bounce.y',0.9);
      this.setAll('collide',false);
    }


    fire(source:Phaser.Sprite)
    {
      this.game.sound.play("bang");
      for (let i = 0;i < 20;i++)
      {
        let angle = Math.random() * 2 * Math.PI - Math.PI;
        this.launchBullet(source.x,source.y,angle,this.bulletSpeed,0,
                          this.bulletGravity,this.bulletLifespan +
                          (Math.random() * 2000 - 500));
      }
    }
  }
}
