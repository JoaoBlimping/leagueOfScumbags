///<reference path="../phaser/phaser.d.ts"/>


module Scumbag
{
  const headingFont = {font:"16px Serif",fontStyle:"bold",fill:"#ff0",backgroundColor:"#087"};
  const questionFont = {font:"16px Serif",fontStyle:"bold",fill:"#ff0",backgroundColor:"#0cc"};
  const bodyFont = {font:"14px Serif",fill:"#ff6"};

  const nSaves = 3;


  /** this is used for any game state that contains gui windows n shit */
  export abstract class GuiState extends Phaser.State
  {
    gui:  GuiElement  = null;

    update()
    {
      if (this.gui == null || !this.gui.blocking)
      {
        this.postGuiUpdate()
      }

      if (this.gui != null)
      {
        let value = this.gui.update();
        if (value != 0)
        {
          if (this.gui.blocking) this.onGuiEnd();
          this.gui.destroy();
          this.gui = null;
          Script.runScript(value);
        }
      }
    }


    /** builds a window that asks the player a question with various possible
     * answers */
    buildTextbox(heading:string,content:string,chipKey?:string):void
    {
      let head = new TextElement(this.game,heading,headingFont);
      let text = new TextElement(this.game,content,bodyFont);
      let clicker = new ClickerElement(this.game,'clicker');

      this.setGui(new Window(this.game,"window",new Array<GuiElement>(head,text,clicker),chipKey));
    }


    /** builds a window that asks the player a question with various possible
     * answers */
    buildQA(question:string,chipKey:string,...answers:string[]):void
    {
      let head = new TextElement(this.game,question,questionFont);

      let body = new Array<TextElement>(answers.length);
      for (let i = 0;i < body.length;i++)
      {
        body[i] = new TextElement(this.game,answers[i],bodyFont);
      }

      let selector = new SelectorElement(this.game,'selector',body);

      this.setGui(new Window(this.game,"window",new Array<GuiElement>(head,selector),chipKey));
    }

    buildPause(question:string,...answers:string[])
    {
      let head = new TextElement(this.game,question,questionFont);

      let body = new Array<TextElement>(answers.length);
      for (let i = 0;i < body.length;i++)
      {
        body[i] = new TextElement(this.game,answers[i],bodyFont);
      }

      let pics:GuiElement[] = []
      for (let u = 0;u < StateOfGame.parameters.characters.length;u++)
      {
        pics[u] = new ImageElement(this.game,StateOfGame.parameters.characters[u]);
      }
      pics[StateOfGame.parameters.characters.length] = new SelectorElement(this.game,'selector',body);

      let shelf = new ShelfElement(this.game,pics);

      this.setGui(new Window(this.game,"window",new Array<GuiElement>(head,shelf)));

    }

    /** builds a window that contains all the save slots with some info */
    buildSlot(cancelFirst:boolean=false):void
    {
      let children:GuiElement[] = [];
      for (let i = 0;i < nSaves;i++)
      {
        let head:GuiElement = new TextElement(this.game,"Slot " + (i + 1),headingFont);

        StateOfGame.load(i + 1);

        let pics:GuiElement[] = []
        for (let u = 0;u < StateOfGame.parameters.characters.length;u++)
        {
          pics[u] = new ImageElement(this.game,StateOfGame.parameters.characters[u]);
        }

        if (pics.length == 0)
        {
          pics[0] = new ImageElement(this.game,"new");
        }

        let level = new TextElement(this.game,StateOfGame.parameters.map,bodyFont);
        let time = new TextElement(this.game,"yeah",bodyFont);
        let details:GuiElement = new StackElement(this.game,[level,time]);
        pics[pics.length] = details;

        let body = new ShelfElement(this.game,pics);

        children[i] = new StackElement(this.game,[head,body]);
      }

      let cancelText = new TextElement(this.game,"Cancel",headingFont);
      let cancelPic = new ImageElement(this.game,"cancel");

      if (cancelFirst)
      {
        children = [<GuiElement>new StackElement(this.game,[cancelText,cancelPic])].concat(children);
      }
      else
      {
        children[nSaves] = new StackElement(this.game,[cancelText,cancelPic]);
      }


      let slots = new SlotElement(this.game,"selector",children);
      this.setGui(new Window(this.game,"window",[slots]));

      StateOfGame.flush();
    }


    buildWaiter(...actorPaths:{name:string,path:string}[])
    {
      this.setGui(new Waiter(this.game,actorPaths));
    }


    /** sets the gui to some gui element */
    private setGui(gui:GuiElement):void
    {
      this.gui = gui;
      this.gui.addPosition(this.game.camera.x,this.game.camera.y);
      if (this.gui.blocking) this.onGuiStart();
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
