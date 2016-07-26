module Scumbag
{
  /** a bullet that gets shot about the place and stuff */
  export class Bullet extends Phaser.Sprite
  {
    tracking    = false;
    collide     = true;
    bouncy      = false;
    scaleSpeed  = 0;
    power       = 1;

    deathGun:   Weapon;
    deathSpawn: string;

    /** constructs the bullet */
    constructor(game:Phaser.Game,key:string,deathGun:Weapon,deathSpawn:string)
    {
      super(game,0,0,key);

      this.anchor.set(0.5);

      this.checkWorldBounds = true;
      this.outOfBoundsKill = true;
      this.exists = false;

      this.deathGun = deathGun;
      this.deathSpawn = deathSpawn;
    }


    /** Fires the bullets so that it is back in the game
     * x and y are it's position to start at
     * angle is the angle it is fired at
     * speed is the speed it moves at
     * gx and gy are the gravity that affect it
     */
    fire(x:number,y:number,angle:number,speed:number,gx:number,gy:number,lifespan:number)
    {
      this.reset(x,y);
      this.scale.set(1);

      this.game.physics.arcade.velocityFromRotation(angle, speed, this.body.velocity);
      this.angle = angle;
      this.body.gravity.set(gx, gy);

      this.lifespan = lifespan;
    }


    update()
    {
      if (this.tracking)
      {
        this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
      }

      if (this.scaleSpeed > 0)
      {
        this.scale.x += this.scaleSpeed;
        this.scale.y += this.scaleSpeed;
      }
    }


    kill()
    {
      if (this.deathGun != undefined) this.deathGun.fire(this);
      if (this.deathSpawn != null)
      {
        let state = this.game.state.getCurrentState();
        if (state instanceof Fight) state.addFighter(this.deathSpawn,this.x,this.y);
      }
      return super.kill();
    }
  }
}
