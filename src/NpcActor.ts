///<reference path="Actor.ts"/>

module Scumbag
{
  /** an actor who isn't the player and walks around and you can talk to them
   * and trash */
  export class NpcActor extends Actor
  {
    path:             Region[]  = [];
    repeatDirections: boolean   = true;
    script:           string    = null;


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
      if (this.path.length == 0) return;

      //the actor is in their target region
      let region = this.path[0];
      if (this.x > region.x && this.x < region.x + region.width &&
          this.y > region.y && this.y < region.y + region.height)
      {
        this.path.push(this.path[0]);
        this.path.splice(0,1);
      }

      //set angle to the target destination
      let deltaX = (this.path[0].x + this.path[0].width / 2) - this.x;
      let deltaY = (this.path[0].y + this.path[0].height / 2) - this.y;
      let angle = Math.atan2(deltaY,deltaX);

      this.body.velocity.x = this.moveSpeed * Math.cos(angle);
      this.body.velocity.y = this.moveSpeed * Math.sin(angle);
    }
  }
}
