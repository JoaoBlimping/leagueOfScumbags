///<reference path="../phaser/phaser.d.ts"/>


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
          this.gui.destroy();
          this.gui = null;
          this.onGuiEnd();
          Script.runScript(value);
        }
      }
    }


    /** builds a window that asks the player a question with various possible
     * answers */
    buildTextbox(heading:string,content:string,chipKey?:string):void
    {
      let head = new TextElement(this.game,heading,{font:"24px Serif",fill:"#0f0"});
      let text = new TextElement(this.game,content,{font:"15px Sans",fill:"#fff"});
      let clicker = new ClickerElement(this.game,'clicker');

      this.setGui(new Window(this.game,"window",new Array<GuiElement>(head,text,clicker),chipKey));
    }


    /** builds a window that asks the player a question with various possible
     * answers */
    buildQA(question:string,chipKey:string,...answers:string[]):void
    {
      let head = new TextElement(this.game,question,
                                 {font:"24px Serif",fill:"#0f0"});

      let body = new Array<TextElement>(answers.length);
      for (let i = 0;i < body.length;i++)
      {
        body[i] = new TextElement(this.game,answers[i],
                                  {font:"15px Sans",fill:"#fff"});
      }

      let selector = new SelectorElement(this.game,'selector',body);

      this.setGui(new Window(this.game,"window",new Array<GuiElement>(head,selector),chipKey));
    }


    /** sets the gui to some gui element */
    private setGui(gui:GuiElement):void
    {
      this.gui = gui;
      this.gui.addPosition(this.game.camera.x,this.game.camera.y);
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
