///<reference path="Weapon.ts"/>

module Scumbag
{
  export namespace Weapons
  {
    /** shoots out some kind of bullet */
    export class EnemyMaker extends Weapon
    {
      enemy:string;

      /** creates the gun */
      constructor(game:Phaser.Game,parent:Phaser.Group,master:Fighter,enemy:string)
      {
        super(game,parent,0,0,master);
        this.enemy = enemy;
      }


      fire(source:Phaser.Sprite)
      {
        let state = this.game.state.getCurrentState();

        if (state instanceof Fight) state.addFighter(this.enemy,source.x,source.y);
      }
    }
  }
}
