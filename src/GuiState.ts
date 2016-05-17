///<reference path="phaser/phaser.d.ts"/>

module Scumbag
{
  /** this is used for any game state that contains gui windows n shit */
  export abstract class GuiState extends Phaser.State
  {
    gui:  GuiElement  = null;

    update()
    {
      if (this.gui == null)
      {
        this.postGuiUpdate()
      }
      else
      {
        //TODO: update the gui element
      }
    }

    /** this is the normal update where stuff that shouldn't happen when the
     * gui is happening go */
    abstract postGuiUpdate():void;


    buildQA(question:string,...answers:string[]):void
    {
      



    }
  }
}
