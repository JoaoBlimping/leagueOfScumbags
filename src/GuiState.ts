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
        let value = this.gui.update();
        if (value != 0)
        {
          this.gui = null;
          this.onGuiEnd();
          Script.runScript(value);
        }
      }
    }


    /** builds a window that asks the player a question with various possible
     * answers */
    buildQA(question:string,...answers:string[]):void
    {
      this.setGui(new Window(this.game,"window",new Array<GuiElement>()));
    }


    /** sets the gui to some gui element */
    private setGui(gui:GuiElement)
    {
      this.gui = gui;
      this.onGuiStart();
    }


    /** this gets called when the gui just starts so you can do things like
     * tell actors to stop moving */
    abstract onGuiStart():void;


    /** this gets called when the gui goes away again so you can make actors
     * start moving again */
    abstract onGuiEnd():void;


    /** this is the normal update where stuff that shouldn't happen when the
     * gui is happening go */
    abstract postGuiUpdate():void;
  }
}
