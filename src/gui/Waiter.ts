module Scumbag
{
  export class Waiter extends GuiElement
  {
    actors:           Actor[] =     [];
    oldMoveModes: MovementMode[] =  [];

    constructor(game:Phaser.Game,actorPaths:{name:string,path:string}[])
    {
      super(false);

      let state = game.state.getCurrentState();

      if (state instanceof Overworld)
      {
        for (let i = 0;i < actorPaths.length;i++)
        {
          this.actors[i] = state.getActorByName(actorPaths[i].name);
          this.actors[i].getPage().path = stringToMovements(actorPaths[i].path,state.regions);
          this.oldMoveModes[i] = this.actors[i].moveMode;
          this.actors[i].moveMode = MovementMode.TemporaryPath;
        }
      }
    }


    bringToFront(){}


    addPosition(x:number,y:number){}


    setPosition(x:number,y:number){}


    getX()
    {
      return 0;
    }


    getY()
    {
      return 0;
    }


    getWidth()
    {
      return 0;
    }


    getHeight()
    {
      return 0;
    }


    update()
    {
      if (this.actors.length == 0) return 1;

      for (let i = 0;i < this.actors.length;i++)
      {
        if (this.actors[i].getPage().path.length > 0) return 0;
      }

      return 1;
    }


    destroy()
    {
      for (let i = 0;i < this.actors.length;i++)
      {
        this.actors[i].moveMode = this.oldMoveModes[i];
      }
    }
  }
}
