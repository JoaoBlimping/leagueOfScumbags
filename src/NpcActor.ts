///<reference path="Actor.ts"/>

module Scumbag
{
  /** an actor who isn't the player and walks around and you can talk to them
   * and trash */
  export class NpcActor extends Actor
  {
    path:             Movement[]= [];
    repeatDirections: boolean   = true;
    script:           string    = null;

    waiting:          boolean   = false;
    waitTime:         number    = 0;


    /** gives it the stuff it specifically needs. everything else is done
     * by modifying it's attributes */
    constructor(game:Phaser.Game,x:number,y:number,key:string)
    {
      //run superconstructor
      super(game,x,y,key);
    }


    /** overrides Phaser.Sprite.update() */
    postActorUpdate()
    {
      if (this.path.length == 0 || this.waiting) return;

      if (this.path[0].type == MovementType.Wait)
      {
        this.waitTime -= this.game.time.elapsedMS;
        if (this.waitTime <= 0) this.nextMovement();
      }
      else if (this.path[0].type == MovementType.Walk) this.walk();
    }

    walk()
    {
      if (this.x > this.path[0].region.x &&
          this.x < this.path[0].region.x + this.path[0].region.width &&
          this.y > this.path[0].region.y &&
          this.y < this.path[0].region.y + this.path[0].region.height)
      {
        this.nextMovement();
        return;
      }

      //set angle to the target destination
      let deltaX = (this.path[0].region.x + this.path[0].region.width / 2) - this.x;
      let deltaY = (this.path[0].region.y + this.path[0].region.height / 2) - this.y;
      let angle = Math.atan2(deltaY,deltaX);

      this.body.velocity.x = this.moveSpeed * Math.cos(angle);
      this.body.velocity.y = this.moveSpeed * Math.sin(angle);
    }

    nextMovement()
    {
      this.path.push(this.path[0]);
      this.path.splice(0,1);
      if (this.path[0].type == MovementType.Wait)
      {
        this.waitTime = this.path[0].waitTime;
      }
    }
  }
}
